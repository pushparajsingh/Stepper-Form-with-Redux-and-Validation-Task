import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstForm: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    state: '',
    zipCode: '',
  },
  secondForm: {
    fields: [],
    employees: '',
    wfhPolicy: '',
  },
  thirdForm: {
    startDate: null,
    planType: '',
    numUsers: 1,
    price: 0,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFirstFormData: (state, action) => {
      state.firstForm = action.payload;
    },
    setSecondFormData: (state, action) => {
      state.secondForm = action.payload;
    },
    setThirdFormData: (state, action) => {
      state.thirdForm = action.payload;
    },
  },
});

export const {
  setFirstFormData,
  setSecondFormData,
  setThirdFormData,
} = formSlice.actions;

export default formSlice.reducer;
