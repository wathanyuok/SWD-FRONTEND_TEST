'use client';
import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import styles from './formTablePage.module.css';
import PersonForm from '@/components/PersonForm';
import PersonTable from '@/components/PersonTable';

export default function FormTablePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [editingPerson, setEditingPerson] = useState(null);

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
          defaultValue={i18n.language === 'th' ? 'th' : 'en'}
          style={{ width: 80 }}
          onChange={lng => i18n.changeLanguage(lng)}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'th', label: 'ไทย' }
          ]}
          className={styles.langSelect}
        />
        <Button
          className={styles.homeBtn}
          onClick={() => router.push('/')}
        >
          {i18n.language === 'th' ? 'หน้าหลัก' : 'Home'}
        </Button>
      </div>
      <div className={styles.title}>{t('formManagement')}</div>
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
