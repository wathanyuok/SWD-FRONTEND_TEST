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

const saveToLocalStorage = (persons: Person[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('persons', JSON.stringify(persons));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};


const getMaxPage = (totalItems: number, itemsPerPage: number): number => {
  return Math.max(Math.ceil(totalItems / itemsPerPage), 1); // ให้มีอย่างน้อย 1 หน้า
};

const initialState: PersonState = {
  persons: loadFromLocalStorage(),
  currentPage: 1,
  itemsPerPage: 2, 
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
      saveToLocalStorage(state.persons);
    },

    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        saveToLocalStorage(state.persons);
      }
    },

    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter(p => p.id !== action.payload);
      
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      if (state.currentPage > maxPage) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },

    deleteSelectedPersons: (state, action: PayloadAction<string[]>) => {
      state.persons = state.persons.filter(p => !action.payload.includes(p.id));
      
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      if (state.currentPage > maxPage) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      const maxPage = getMaxPage(state.persons.length, state.itemsPerPage);
      state.currentPage = Math.min(Math.max(1, action.payload), maxPage);
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      
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
