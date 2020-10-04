import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import themeObj from '@/src/theme';
import { darkThemeFromLS, setThemeToLS } from '@/src/utils';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const localDarkTheme = darkThemeFromLS();
  const queryDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');

  const [isDarkMode, setPrefersDarkMode] = React.useState(localDarkTheme ?? queryDarkTheme);

  useEffect(() => {
    setPrefersDarkMode(localDarkTheme ?? queryDarkTheme);
  }, [localDarkTheme, queryDarkTheme]);

  const toggleTheme = React.useCallback(() => {
    const newTheme = !isDarkMode;
    setPrefersDarkMode(newTheme);
    setThemeToLS(newTheme === true ? 'dark' : 'light');
  }, [isDarkMode]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...themeObj,
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );

  return (
    <>
      <Head>
        <title>Crystal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} prefersDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </>
  );
}
