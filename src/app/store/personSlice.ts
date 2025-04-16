import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  nationality: string;
  citizenId: string;
  citizenId1?: string;
  citizenId2?: string;
  citizenId3?: string;
  citizenId4?: string;
  citizenId5?: string;
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
  totalItems: number;
}

const loadFromLocalStorage = (): Person[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('persons');
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const saveToLocalStorage = (persons: Person[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('persons', JSON.stringify(persons));
  }
};

const initialState: PersonState = {
  persons: loadFromLocalStorage(),
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: loadFromLocalStorage().length,
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
      state.totalItems = state.persons.length;
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
      state.totalItems = state.persons.length;
      
      const maxPage = Math.ceil(state.totalItems / state.itemsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },
    
    deleteSelectedPersons: (state, action: PayloadAction<string[]>) => {
      state.persons = state.persons.filter(p => !action.payload.includes(p.id));
      state.totalItems = state.persons.length;
      
      const maxPage = Math.ceil(state.totalItems / state.itemsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      }
      
      saveToLocalStorage(state.persons);
    },
    
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      
      const maxPage = Math.ceil(state.totalItems / state.itemsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      }
    }
  },
});

export const { 
  addPerson, 
  updatePerson, 
  deletePerson, 
  deleteSelectedPersons, 
  setCurrentPage,
  setItemsPerPage
} = personSlice.actions;

export default personSlice.reducer;
