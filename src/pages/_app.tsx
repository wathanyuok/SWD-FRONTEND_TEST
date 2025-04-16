// src/pages/_app.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/app/i18n';
import '../styles/globals.css';
import { store } from '@/app/store';

store


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default MyApp;
