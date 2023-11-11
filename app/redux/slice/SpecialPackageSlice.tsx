import {createSlice} from '@reduxjs/toolkit';
import {specialPackageService} from '../service/SpecialPackageService';

const initialState = {
  samyakDetailsSpecialPackagePost: [],
};

export const specialPackageSlice = createSlice({
  name: 'specialPackage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      specialPackageService.endpoints.samyakSpecialPackagePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsSpecialPackagePost = payload;
        console.log('specialpackagePayload?????????', payload);
      },
    );
  },
});

export const {} = specialPackageSlice.actions;

export default specialPackageSlice.reducer;
