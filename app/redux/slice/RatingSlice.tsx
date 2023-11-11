import {createSlice} from '@reduxjs/toolkit';
import {ratingService} from '../service/RatingService';

const initialState = {
  samyakDetailsRatingPost: [],
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      ratingService.endpoints.samyakRatingPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsRatingPost = payload;
        console.log('ratingPayload**********', payload);
      },
    );
  },
});

export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
