'use client';
import React, { useState, useEffect } from 'react';
import { Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import styles from './formTablePage.module.css';
import PersonForm from '@/components/PersonForm';
import PersonTable from '@/components/PersonTable';

export default function FormTablePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState(i18n.language || 'en'); 
  const [editingPerson, setEditingPerson] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const handleEditPerson = (person) => {
    setEditingPerson(person);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishForm = () => {
    setEditingPerson(null);
  };

  return (
    <div className={styles.gradientBg}>
      <div className={styles.topBar}>
        <Select
          value={language} 
          style={{ width: 80 }}
          onChange={(lng) => {
            setLanguage(lng);
            i18n.changeLanguage(lng);
          }}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'th', label: 'ไทย' },
          ]}
          popupMatchSelectWidth={false} 
          className={styles.langSelect}
        />
        <Button
          className={styles.homeBtn}
          onClick={() => router.push('/')}
        >
          {language === 'th' ? 'หน้าหลัก' : 'Home'}
        </Button>
      </div>
      <div className={styles.title} suppressHydrationWarning>
        {t('formManagement')}
      </div>
      <div className={styles.centerBox}>
        <PersonForm
          editingPerson={editingPerson}
          onFinishForm={handleFinishForm}
        />
      </div>
      <div className={styles.tableBox}>
        <PersonTable onEditPerson={handleEditPerson} />
      </div>
    </div>
  );
}