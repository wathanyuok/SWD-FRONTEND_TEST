// app/components/LanguageSwitcher.tsx
'use client';
import React from 'react';
import { Radio, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Space>
      <GlobalOutlined />
      <Radio.Group value={i18n.language} onChange={changeLanguage}>
        <Radio.Button value="en">English</Radio.Button>
        <Radio.Button value="th">ไทย</Radio.Button>
      </Radio.Group>
    </Space>
  );
};

export default LanguageSwitcher;
