import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from 'antd';
import PersonForm from '../components/PersonForm';
import PersonTable from '../components/PersonTable';
import styles from "./formTablePage.module.css";

const { Title } = Typography;

const FormTablePage = () => {
  const { t } = useTranslation();
  const [editingPerson, setEditingPerson] = useState(null);

  const handleEditPerson = (person) => {
    setEditingPerson(person);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishForm = () => {
    setEditingPerson(null);
  };

  return (
    <div className={styles.container}>
      <Title level={2}>{t('formManagement')}</Title>
      
      <Card className={styles.formCard}>
        <PersonForm 
          editingPerson={editingPerson} 
          onFinishForm={handleFinishForm} 
        />
      </Card>
      
      <div className={styles.tableSection}>
        <PersonTable onEditPerson={handleEditPerson} />
      </div>
    </div>
  );
};

export default FormTablePage;
