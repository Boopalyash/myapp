import {createSlice} from '@reduxjs/toolkit';
import {editPatientService} from '../service/EditPatientService';
import { forgetPasswordService } from '../service/ForgetPasswordService';

const initialState = {
    samyakDetailForgetPasswordPost: [],
};

export const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      forgetPasswordService.endpoints.samyakForgetPasswordPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailForgetPasswordPost = payload;
        console.log('forgetPasswordPayload?????????', payload);
      },
    );
  },
});

export const {} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
