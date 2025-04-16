import React, { useEffect, useState } from 'react';
import { Table, Button, Checkbox, Space, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePerson,
  deleteSelectedPersons,
  setCurrentPage,
} from '@/app/store/personSlice';
import { RootState } from '@/app/store';

interface PersonTableProps {
  onEditPerson: (person: any) => void;
}

const PersonTable: React.FC<PersonTableProps> = ({ onEditPerson }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  
  const { persons, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.person
  );

  const totalItems = persons.length;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = persons.slice(startIndex, endIndex);
  
  useEffect(() => {
    setSelectedRowKeys([]);
  }, [currentPage]);

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      dispatch(deletePerson(id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;
    if (window.confirm(t('confirmDelete'))) {
      dispatch(deleteSelectedPersons(selectedRowKeys));
      setSelectedRowKeys([]);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as string[]);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: t('name'),
      key: 'name',
      render: (_: any, record: any) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => t(gender),
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      render: (nationality: string) => t(nationality),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => onEditPerson(record)}>{t('edit')}</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            {t('delete')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={
            selectedRowKeys.length === currentPageData.length &&
            currentPageData.length > 0
          }
          indeterminate={
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length < currentPageData.length
          }
          onChange={(e) => {
            const newKeys = e.target.checked
              ? currentPageData.map((item) => item.id)
              : [];
            setSelectedRowKeys(newKeys);
          }}
        >
          {t('selectAll')}
        </Checkbox>
        <Button
          danger
          disabled={selectedRowKeys.length === 0}
          onClick={handleDeleteSelected}
          style={{ marginLeft: 8 }}
        >
          {t('deleteSelected')}
        </Button>
      </div>

      <Table
        key={`table-${currentPage}`} 
        rowSelection={rowSelection}
        columns={columns}
        dataSource={currentPageData}
        rowKey="id"
        pagination={false}
        bordered
      />

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          showTotal={(total) => `${t('totalItems')} ${total}`}
        />
      </div>
    </div>
  );
};

export default PersonTable;
