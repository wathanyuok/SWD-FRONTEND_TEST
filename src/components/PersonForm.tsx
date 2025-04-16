import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Radio, DatePicker, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addPerson, updatePerson } from '@/app/store/personSlice';
import dayjs from 'dayjs'; // Import Day.js
import "flag-icons/css/flag-icons.min.css";

const { Option } = Select;

// Define country options for phone code selection
const countryOptions = [
  { value: "+66", label: "Thailand", flag: "th" },
  { value: "+1", label: "USA", flag: "us" },
  { value: "+81", label: "Japan", flag: "jp" },
  { value: "+84", label: "Vietnam", flag: "vn" },
];

// Define nationalities for nationality selection
const nationalities = [
  { value: "thai", label: "Thai" },
  { value: "lao", label: "Lao" },
  { value: "other", label: "Other" },
];

// Required label component
const Required = ({ children }: { children: React.ReactNode }) => (
  <span>
    <span style={{ color: "red" }}></span> {children}
  </span>
);

const PersonForm = ({ editingPerson = null, onFinishForm = () => {} }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingPerson) {
      // Split citizenId into 5 parts for input fields
      const citizenIdParts = editingPerson.citizenId ? editingPerson.citizenId.split('-') : [];
      const formValues = {
        ...editingPerson,
        citizenId1: citizenIdParts[0] || '',
        citizenId2: citizenIdParts[1] || '',
        citizenId3: citizenIdParts[2] || '',
        citizenId4: citizenIdParts[3] || '',
        citizenId5: citizenIdParts[4] || '',
        dob: editingPerson.dob ? dayjs(editingPerson.dob) : null, // Convert date to Day.js Object
      };
      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [editingPerson, form]);

  // Handle form submission
  const handleSubmit = (values) => {
    // Combine citizenId parts into a single string
    const citizenId = [
      values.citizenId1,
      values.citizenId2,
      values.citizenId3,
      values.citizenId4,
      values.citizenId5,
    ].join('-');

    // Combine phone code and phone number
    const phone = `${values.phoneCode}-${values.phoneNumber}`;

    // Create or update person data
    const personData = {
      id: editingPerson?.id || uuidv4(),
      ...values,
      citizenId,
      phone,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null, // Convert date back to string
    };

    // Dispatch action to Redux store
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
        phoneCode: "+66", // Initial value for phone code
      }}
    >
      {/* Row 1: Title, Firstname, Lastname */}
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

      {/* Row 2: Birthday, Nationality */}
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
              placeholder={t("selectDate")} // Use translation key
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

      {/* Row 3: CitizenID (5 fields) */}
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

      {/* Row 4: Gender */}
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

      {/* Row 5: Mobile Phone (2 fields) */}
      <Row gutter={8} align="middle">
        <Col flex="160px">
          <Form.Item
            name="phoneCode"
            label={t("phoneCode")}
            rules={[{ required: true, message: t("phoneCodeRequired") }]}
          >
            <Select
              style={{ width: "100%" }}
              popupMatchSelectWidth={false} // Replace deprecated API
              optionLabelProp="label"
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

      {/* Row 6: Passport No. */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="passportNo" label={t("passportNo")}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 7: Expected Salary */}
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

      {/* Submit and Reset Buttons */}
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