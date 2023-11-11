import {createSlice} from '@reduxjs/toolkit';
import {editGenderService} from '../service/EditGenderService';

const initialState = {
  samyakDetailsEditGenderPost: [],
};

export const editGenderSlice = createSlice({
  name: 'editGender',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      editGenderService.endpoints.samyakEditGenderPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsEditGenderPost = payload;
        console.log('editGenderPayload?????????', payload);
      },
    );
  },
});

export const {} = editGenderSlice.actions;

export default editGenderSlice.reducer;
