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
  
  // ดึงข้อมูลจาก Redux store
  const { persons, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.person
  );

  // คำนวณจำนวนข้อมูลทั้งหมด
  const totalItems = persons.length;
  
  // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = persons.slice(startIndex, endIndex);
  
  // รีเซ็ตการเลือกเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setSelectedRowKeys([]);
  }, [currentPage]);

  // จัดการการลบข้อมูล
  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      dispatch(deletePerson(id));
    }
  };

  // จัดการการลบข้อมูลที่เลือก
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;
    if (window.confirm(t('confirmDelete'))) {
      dispatch(deleteSelectedPersons(selectedRowKeys));
      setSelectedRowKeys([]);
    }
  };

  // จัดการการเลือกแถว
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as string[]);
  };

  // จัดการการเปลี่ยนหน้า
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
      {/* เลือกทั้งหมดและปุ่มลบ */}
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

      {/* ตาราง */}
      <Table
        key={`table-${currentPage}`} // เพิ่ม key เพื่อบังคับให้ re-render เมื่อเปลี่ยนหน้า
        rowSelection={rowSelection}
        columns={columns}
        dataSource={currentPageData}
        rowKey="id"
        pagination={false}
        bordered
      />

      {/* Pagination */}
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
