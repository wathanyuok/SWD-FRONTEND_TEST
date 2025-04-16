import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import { useRouter } from "next/navigation";
import styles from '@/app/form-table/formTablePage.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  return (
    <div className={styles.topBar}>
      <Select
        value={language}
        onChange={(lng) => {
          setLanguage(lng);
          i18n.changeLanguage(lng);
          localStorage.setItem("i18nextLng", lng); 
        }}
        style={{ width: 80 }}
        options={[
          { value: "th", label: "ไทย" },
          { value: "en", label: "EN" },
        ]}
      />
      <Button onClick={() => router.push("/")}>หน้าหลัก</Button>
    </div>
  );
};

export default LanguageSwitcher;