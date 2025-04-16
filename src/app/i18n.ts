import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      test1: "Test 1",
      desc1: "Layout & Style",
      test2: "Test 2",
      desc2: "Connect API",
      test3: "Test 3",
      desc3: "Form & Table",
      formManagement: "Form & Table",
      prefix: "Title",
      mr: "Mr.",
      mrs: "Mrs.",
      miss: "Miss",
      firstName: "Firstname",
      lastName: "Lastname",
      dob: "Birthday",
      nationality: "Nationality",
      selectNationality: "Please select",
      thai: "Thai",
      lao: "Lao",
      other: "Other",
      citizenId: "CitizenID",
      gender: "Gender",
      male: "Male",
      female: "Female",
      otherGender: "Unsex",
      phoneCode: "Mobile Phone",
      phone: "Phone",
      passportNo: "Passport No.",
      expectSalary: "Expected Salary",
      clear: "RESET",
      submit: "SUBMIT",
      // validation
      prefixRequired: "Please select title",
      firstNameRequired: "Please input firstname",
      lastNameRequired: "Please input lastname",
      dobRequired: "Please select birthday",
      nationalityRequired: "Please select nationality",
      genderRequired: "Please select gender",
      phoneCodeRequired: "Please select country code",
      phoneRequired: "Please input phone number",
      expectSalaryRequired: "Please input expected salary",
      personManagement: "Person Management",
      addPerson: "Add Person",
      editPerson: "Edit Person",
      email: "Email",
      address: "Address",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      update: "Update",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this person?",
      yes: "Yes",
      no: "No",
      emailRequired: "Please input email",
      invalidEmail: "Please enter a valid email",
      totalItems: "Total {total} items",
    },
  },
  th: {
    translation: {
      test1: "ทดสอบ 1",
      desc1: "การจัดวางและการสไตล์",
      test2: "ทดสอบ 2",
      desc2: "เชื่อมต่อ API",
      test3: "ทดสอบ 3",
      desc3: "ฟอร์มและตาราง",
      home: "หน้าหลัก",
      formManagement: "การจัดการหน้าฟอร์ม",
      prefix: "คำนำหน้า",
      mr: "นาย",
      mrs: "นาง",
      miss: "นางสาว",
      firstName: "ชื่อ",
      lastName: "นามสกุล",
      dob: "วันเกิด",
      nationality: "สัญชาติ",
      selectNationality: "กรุณาเลือก",
      thai: "ไทย",
      lao: "ลาว",
      other: "อื่นๆ",
      citizenId: "เลขบัตรประชาชน",
      gender: "เพศ",
      male: "ชาย",
      female: "หญิง",
      otherGender: "ไม่ระบุ",
      phoneCode: "หมายเลขโทรศัพท์มือถือ",
      phone: "โทรศัพท์",
      passportNo: "หนังสือเดินทาง",
      expectSalary: "เงินเดือนที่คาดหวัง",
      clear: "ล้างข้อมูล",
      submit: "ส่งข้อมูล",
      // validation messages
      prefixRequired: "กรุณาเลือกคำนำหน้า",
      firstNameRequired: "กรุณาใส่ชื่อ",
      lastNameRequired: "กรุณาใส่นามสกุล",
      dobRequired: "กรุณาเลือกวันเกิด",
      nationalityRequired: "กรุณาเลือกสัญชาติ",
      genderRequired: "กรุณาเลือกเพศ",
      phoneCodeRequired: "กรุณาเลือกหมายเลขโทรศัพท์",
      phoneRequired: "กรุณาใส่เบอร์โทรศัพท์",
      expectSalaryRequired: "กรุณาใส่เงินเดือนที่คาดหวัง",
      personManagement: "จัดการข้อมูลบุคคล",
      addPerson: "เพิ่มข้อมูลบุคคล",
      editPerson: "แก้ไขข้อมูลบุคคล",
      email: "อีเมล",
      address: "ที่อยู่",
      actions: "การดำเนินการ",
      edit: "แก้ไข",
      delete: "ลบ",
      add: "เพิ่ม",
      update: "อัปเดต",
      cancel: "ยกเลิก",
      confirmDelete: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
      yes: "ใช่",
      no: "ไม่",
      emailRequired: "กรุณาใส่อีเมล",
      invalidEmail: "กรุณาใส่อีเมลที่ถูกต้อง",
      totalItems: "ทั้งหมด {total} รายการ",
    },
  },
};

export const initializeI18n = () => {
  if (typeof window !== 'undefined') { 
    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      debug: true, 
      resources,
      interpolation: {
        escapeValue: false,
      },
    })
    .then(() => {
      console.log("i18next initialized successfully"); 
    })
    .catch((error) => {
      console.error("Error initializing i18next:", error); 
    });
  }
};

initializeI18n();

export default i18n;
