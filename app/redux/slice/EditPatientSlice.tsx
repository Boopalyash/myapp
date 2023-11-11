import {createSlice} from '@reduxjs/toolkit';
import {editPatientService} from '../service/EditPatientService';

const initialState = {
  samyakDetailsEditPatientPost: [],
};

export const editPatientSlice = createSlice({
  name: 'editPatient',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      editPatientService.endpoints.samyakEditPatientPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsEditPatientPost = payload;
        console.log('editMemberPayload?????????', payload);
      },
    );
  },
});

export const {} = editPatientSlice.actions;

export default editPatientSlice.reducer;
