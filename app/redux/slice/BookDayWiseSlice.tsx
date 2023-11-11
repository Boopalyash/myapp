import {createSlice} from '@reduxjs/toolkit';
import {BookDayWiseService} from '../service/BookDayWiseService';

const initialState = {
  samyakDetailsBookdayWisePost: [],
};

export const BookDayWiseSlice = createSlice({
  name: 'BookDayWise',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      BookDayWiseService.endpoints.samyakBookDayWisePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsBookdayWisePost = payload;
        // console.log('bookDayWisePayload?????????', payload);
      },
    );
  },
});

export const {} = BookDayWiseSlice.actions;

export default BookDayWiseSlice.reducer;
