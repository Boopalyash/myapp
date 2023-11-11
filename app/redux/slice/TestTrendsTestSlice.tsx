import {createSlice} from '@reduxjs/toolkit';
import {testTrendsService} from '../service/TestTrendsTest';

const initialState = {
  samyakDetailsTestTrendsTestPost: [],
};

export const testTrendsTestSlice = createSlice({
  name: 'testTrendsTest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      testTrendsService.endpoints.samyakTestTrendsPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsTestTrendsTestPost = payload;
        console.log('testTrendsTestPayload?????????', payload);
      },
    );
  },
});

export const {} = testTrendsTestSlice.actions;

export default testTrendsTestSlice.reducer;
