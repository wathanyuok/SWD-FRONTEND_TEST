import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Select } from "antd";
import { useRouter } from "next/navigation";
import styles from '@/app/form-table/formTablePage.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  return (
    <div className={styles.topBar}>
      <Select
        value={i18n.language}
        onChange={lng => i18n.changeLanguage(lng)}
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
