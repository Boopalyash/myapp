import {createSlice} from '@reduxjs/toolkit';
import {reviewService} from '../service/ReviewService';

const initialState = {
  samyakDetailsReviewPost: [],
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      reviewService.endpoints.samyakReviewPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsReviewPost = payload;
      },
    );
  },
});

export const {} = reviewSlice.actions;

export default reviewSlice.reducer;
