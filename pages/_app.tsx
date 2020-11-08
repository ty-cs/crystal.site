import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeObj from '@/src/theme';
import useMuiTheme from '@/src/hooks/useMuiTheme';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const { theme, isDarkMode, toggleTheme } = useMuiTheme(themeObj);

  return (
    <>
      <Head>
        <title>Crystal</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Network utilities for developers" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </>
  );
}
