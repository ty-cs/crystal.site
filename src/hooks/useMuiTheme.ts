import React, { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

type LocalTheme = 'dark' | 'light' | 'auto';

const isBrowser = () => typeof window !== 'undefined';
const THEME_KEY = `__theme`;

export const darkThemeFromLS = (): boolean | null => {
  try {
    if (!isBrowser()) {
      return null;
    }
    const res = window.localStorage.getItem(THEME_KEY);

    if (res === null) {
      return null;
    }
    return res === 'dark';
  } catch (e) {
    console.error('ERROR', e);
    return null;
  }
};

export const setThemeToLS = (theme: LocalTheme) => {
  if (!isBrowser()) {
    return;
  }
  window && window.localStorage.setItem(THEME_KEY, theme);
};

const useMuiTheme = (themeObj: Theme) => {
  const localDarkTheme = darkThemeFromLS();
  const queryDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');

  const [isDarkMode, setIsDarkMode] = React.useState(localDarkTheme ?? queryDarkTheme);

  useEffect(() => {
    // update the initial state automatically when necessary
    setIsDarkMode(localDarkTheme ?? queryDarkTheme);
  }, [localDarkTheme, queryDarkTheme]);

  // update later manually
  const toggleTheme = React.useCallback(() => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    setThemeToLS(newTheme ? 'dark' : 'light');
  }, [isDarkMode]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...themeObj,
        palette: {
          type: isDarkMode ? 'dark' : 'light',
          // background: {
          //   default: isDarkMode ? '#000' : '#fff',
          //   paper: isDarkMode ? '#000' : '#fff',
          // },
        },
      }),
    [themeObj],
  );
  return { theme, isDarkMode, toggleTheme };
};

export default useMuiTheme;
