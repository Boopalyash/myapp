import {createSlice} from '@reduxjs/toolkit';
import {bookingListPostService} from '../service/BookingListPostService';

const initialState = {
  samyakDetailsBookingListPost: [],
};

export const bookingListPostSlice = createSlice({
  name: 'bookingList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      bookingListPostService.endpoints.samyakBookingListPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsBookingListPost = payload.Message;
        // console.log('BookingListPayload?????????', payload);
      },
    );
  },
});

export const {} = bookingListPostSlice.actions;

export default bookingListPostSlice.reducer;
