// app/ClientLayout.tsx (Client Component)
'use client';
import { Provider } from 'react-redux';
import { store } from './store';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { initializeI18n } from './i18n';
import "./globals.css";

export default function ClientLayout({
  children,
  fonts
}: {
  children: React.ReactNode;
  fonts: { geistSans: any; geistMono: any };
}) {
  useEffect(() => {
    initializeI18n();
  }, []);

  return (
    <html lang="en">
      <body className={`${fonts.geistSans.variable} ${fonts.geistMono.variable}`}>
        <Provider store={store}>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </Provider>
      </body>
    </html>
  );
}
