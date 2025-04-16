import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  nationality: string;
  citizenId: string;
  gender: 'male' | 'female' | 'other';
  phoneCode: string;
  phoneNumber: string;
  phone: string;
  passportNo?: string;
  expectSalary: string;
}

interface PersonState {
  persons: Person[];
  currentPage: number;
  itemsPerPage: number;
}

// โหลดข้อมูลจาก localStorage
const loadFromLocalStorage = (): Person[] => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem('persons');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  }
  return [];
};

// บันทึกข้อมูลลง localStorage
const saveToLocalStorage = (persons: Person[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('persons', JSON.stringify(persons));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

// คำนวณหน้าสูงสุด
const getMaxPage = (totalItems: number, itemsPerPage: number): number => {
  return Math.max(Math.ceil(totalItems / itemsPerPage), 1); // ให้มีอย่างน้อย 1 หน้า
};

// สถานะเริ่มต้น
const initialState: PersonState = {
  persons: loadFromLocalStorage(),
  currentPage: 1,
  itemsPerPage: 2, // จำนวนรายการต่อหน้า
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    // เพิ่มข้อมูลบุคคล
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
      saveToLocalStorage(state.persons);
    },

    // อัพเดทข้อมูลบุคคล
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        saveToLocalStorage(state.persons);
      }
    },

    // ลบข้อมูลบุคคล
    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter(p => p.id !== action.payload);
      
      // ตรวจสอบว่าหน้าปัจจุบันยังคงถูกต้องหลังจากลบข้อมูล
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      if (state.currentPage > maxPage) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },

    // ลบข้อมูลบุคคลที่เลือก
    deleteSelectedPersons: (state, action: PayloadAction<string[]>) => {
      state.persons = state.persons.filter(p => !action.payload.includes(p.id));
      
      // ตรวจสอบว่าหน้าปัจจุบันยังคงถูกต้องหลังจากลบข้อมูล
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      if (state.currentPage > maxPage) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },

    // กำหนดหน้าปัจจุบัน
    setCurrentPage: (state, action: PayloadAction<number>) => {
      // ตรวจสอบว่าหน้าที่จะกำหนดอยู่ในช่วงที่ถูกต้อง
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      state.currentPage = Math.min(Math.max(1, action.payload), maxPage);
    },

    // กำหนดจำนวนรายการต่อหน้า
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      
      // เมื่อเปลี่ยนจำนวนรายการต่อหน้า ให้กลับไปหน้าแรก
      state.currentPage = 1;
    },
  },
});

export const {
  addPerson,
  updatePerson,
  deletePerson,
  deleteSelectedPersons,
  setCurrentPage,
  setItemsPerPage,
} = personSlice.actions;

export default personSlice.reducer;
