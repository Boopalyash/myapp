import {createSlice} from '@reduxjs/toolkit';
import {titleService} from '../service/TitleService';

const initialState = {
  samyakDetailsTitlePost: [],
};

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      titleService.endpoints.samyakTitlePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsTitlePost = payload;
        console.log('titlePayload?????????', payload);
      },
    );
  },
});

export const {} = titleSlice.actions;

export default titleSlice.reducer;
