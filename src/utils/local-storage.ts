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
