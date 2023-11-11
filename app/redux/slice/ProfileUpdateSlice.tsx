import {createSlice} from '@reduxjs/toolkit';
import {profileUpdateService} from '../service/ProfileUpdateService';

const initialState = {
  samyakDetailsProfileUpdatePost: [],
};

export const profileUpdateSlice = createSlice({
  name: 'profileUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      profileUpdateService.endpoints.samyakProfileUpdatePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsProfileUpdatePost = payload;
        console.log('profileUpdatePayload**********', payload);
      },
    );
  },
});

export const {} = profileUpdateSlice.actions;

export default profileUpdateSlice.reducer;
