type LocalTheme = 'dark' | 'light' | 'auto';

const isBrowser = () => typeof window !== 'undefined';

export const darkThemeFromLS = (): boolean | null => {
  try {
    if (!isBrowser()) {
      return null;
    }
    const res = window.localStorage.getItem('dark-theme');

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
  window && window.localStorage.setItem('dark-theme', theme);
};
