import {createSlice} from '@reduxjs/toolkit';
import {profileService} from '../service/ProfileService';

const initialState = {
  samyakProfileDetailsPost: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      profileService.endpoints.samyakProfilePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakProfileDetailsPost = payload;
        console.log('profileDetails^^^^^^^^^^^^^^', payload);
      },
    );
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
