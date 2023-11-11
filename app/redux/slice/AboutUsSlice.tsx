import {createSlice} from '@reduxjs/toolkit';
import {aboutUsService} from '../service/AboutUsService';

const initialState = {
  samyakDetailsAboutUsPost: [],
};

export const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      aboutUsService.endpoints.samyakAboutUsPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsAboutUsPost = payload;
      },
    );
  },
});

export const {} = aboutUsSlice.actions;

export default aboutUsSlice.reducer;
