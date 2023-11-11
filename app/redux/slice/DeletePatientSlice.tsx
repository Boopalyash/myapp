import {createSlice} from '@reduxjs/toolkit';
import {deletePatientService} from '../service/DeletePatientService';

const initialState = {
  samyakDetailsDeletePatientPost: [],
};

export const deletePatientSlice = createSlice({
  name: 'deletePatient',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      deletePatientService.endpoints.samyakDeletePatientPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsDeletePatientPost = payload;
        console.log('deletePatientPayload?????????', payload);
      },
    );
  },
});

export const {} = deletePatientSlice.actions;

export default deletePatientSlice.reducer;
