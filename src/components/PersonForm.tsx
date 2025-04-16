import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Radio, DatePicker, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addPerson, updatePerson } from '@/app/store/personSlice';
import dayjs from 'dayjs';
import "flag-icons/css/flag-icons.min.css";

const { Option } = Select;

// ตัวเลือกประเทศสำหรับรหัสโทรศัพท์
const countryOptions = [
  { value: "+66", label: "Thailand", flag: "th" },
  { value: "+1", label: "USA", flag: "us" },
  { value: "+81", label: "Japan", flag: "jp" },
  { value: "+84", label: "Vietnam", flag: "vn" },
];

// ตัวเลือกสัญชาติ
const nationalities = [
  { value: "thai", label: "Thai" },
  { value: "lao", label: "Lao" },
  { value: "other", label: "Other" },
];

// คอมโพเนนต์สำหรับแสดง * ข้าง label ฟิลด์ที่บังคับกรอก
const Required = ({ children }: { children: React.ReactNode }) => (
  <span suppressHydrationWarning>
    <span style={{ color: "red" }}>*</span> {children}
  </span>
);

const PersonForm = ({ editingPerson = null, onFinishForm = () => {} }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // เมื่อมีข้อมูลสำหรับแก้ไข ให้เติมค่าในฟอร์ม
  useEffect(() => {
    if (editingPerson) {
      const citizenIdParts = editingPerson.citizenId ? editingPerson.citizenId.split('-') : [];
      const phoneInfo = editingPerson.phone ? editingPerson.phone.split('-') : ['+66', ''];
      const formValues = {
        ...editingPerson,
        citizenId1: citizenIdParts[0] || '',
        citizenId2: citizenIdParts[1] || '',
        citizenId3: citizenIdParts[2] || '',
        citizenId4: citizenIdParts[3] || '',
        citizenId5: citizenIdParts[4] || '',
        phoneCode: phoneInfo[0] || '+66',
        phoneNumber: phoneInfo[1] || '',
        dob: editingPerson.dob ? dayjs(editingPerson.dob) : null,
      };
      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [editingPerson, form]);

  // จัดการเมื่อ submit ฟอร์ม
  const handleSubmit = (values) => {
    // รวม citizenId จาก 5 ช่อง
    const citizenId = [
      values.citizenId1,
      values.citizenId2,
      values.citizenId3,
      values.citizenId4,
      values.citizenId5,
    ].join('-');

    // รวมเบอร์โทรศัพท์
    const phone = `${values.phoneCode}-${values.phoneNumber}`;

    // สร้างข้อมูลบุคคล
    const personData = {
      id: editingPerson?.id || uuidv4(),
      ...values,
      citizenId,
      phone,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
    };

    // ส่งข้อมูลไป Redux
    if (editingPerson) {
      dispatch(updatePerson(personData));
    } else {
      dispatch(addPerson(personData));
    }

    form.resetFields();
    onFinishForm();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        prefix: "",
        gender: "male",
        nationality: "",
        phoneCode: "+66",
      }}
    >
      {/* แถว 1: คำนำหน้า, ชื่อ, นามสกุล */}
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item
            name="prefix"
            label={<Required>{t("prefix")}</Required>}
            rules={[{ required: true, message: t("prefixRequired") }]}
          >
            <Select>
              <Option value="mr">{t("mr")}</Option>
              <Option value="mrs">{t("mrs")}</Option>
              <Option value="miss">{t("miss")}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="firstName"
            label={<Required>{t("firstName")}</Required>}
            rules={[{ required: true, message: t("firstNameRequired") }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="lastName"
            label={<Required>{t("lastName")}</Required>}
            rules={[{ required: true, message: t("lastNameRequired") }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 2: วันเกิด, สัญชาติ */}
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="dob"
            label={<Required>{t("dob")}</Required>}
            rules={[{ required: true, message: t("dobRequired") }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              placeholder={t("selectDate")}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="nationality"
            label={<Required>{t("nationality")}</Required>}
            rules={[{ required: true, message: t("nationalityRequired") }]}
          >
            <Select placeholder={t("selectNationality")}>
              {nationalities.map(n => (
                <Option key={n.value} value={n.value}>{t(n.value)}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 3: รหัสบัตรประชาชน 5 ช่อง */}
      <Row gutter={8}>
        <Col span={4}>
          <Form.Item name="citizenId1" label={t("citizenId")}>
            <Input maxLength={1} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="citizenId2" label=" ">
            <Input maxLength={4} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="citizenId3" label=" ">
            <Input maxLength={5} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="citizenId4" label=" ">
            <Input maxLength={2} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="citizenId5" label=" ">
            <Input maxLength={1} />
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 4: เพศ */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="gender"
            label={<Required>{t("gender")}</Required>}
            rules={[{ required: true, message: t("genderRequired") }]}
          >
            <Radio.Group>
              <Radio value="male">{t("male")}</Radio>
              <Radio value="female">{t("female")}</Radio>
              <Radio value="other">{t("otherGender")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 5: เบอร์โทรศัพท์ */}
      <Row gutter={8} align="middle">
        <Col flex="160px">
          <Form.Item
            name="phoneCode"
            label={t("phoneCode")}
            rules={[{ required: true, message: t("phoneCodeRequired") }]}
          >
            <Select
              style={{ width: "100%" }}
              popupMatchSelectWidth={false}
              optionLabelProp="label"
              value="+66"
            >
              {countryOptions.map((c) => (
                <Option key={c.value} value={c.value} label={c.value}>
                  <span className={`fi fi-${c.flag}`} style={{ marginRight: 8 }} />
                  {c.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <span style={{ fontSize: 18, color: "#888" }}>-</span>
        </Col>
        <Col flex="auto">
          <Form.Item
            name="phoneNumber"
            label=" "
            rules={[{ required: true, message: t("phoneRequired") }]}
          >
            <Input maxLength={10} style={{ width: "100%" }} placeholder={t("phone")} />
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 6: เลขหนังสือเดินทาง */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="passportNo" label={t("passportNo")}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* แถว 7: เงินเดือนที่ต้องการ */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="expectSalary"
            label={<Required>{t("expectSalary")}</Required>}
            rules={[{ required: true, message: t("expectSalaryRequired") }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* ปุ่ม submit และ reset */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <Button htmlType="reset">{t("clear")}</Button>
        <Button type="primary" htmlType="submit">
          {editingPerson ? t("update") : t("submit")}
        </Button>
      </div>
    </Form>
  );
};

export default PersonForm;
