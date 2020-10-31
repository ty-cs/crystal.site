import React, { useEffect } from 'react';
import { darkThemeFromLS, setThemeToLS } from '@/src/utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import themeObj from '@/src/theme';

const useMuiTheme = () => {
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
    [isDarkMode],
  );
  return { theme, isDarkMode, toggleTheme };
};

export default useMuiTheme;
