import {createSlice} from '@reduxjs/toolkit';
import {bookTypeService} from '../service/BookTypeService';

const initialState = {
  samyakDetailsBookTypePost: [],
};

export const bookTypeSlice = createSlice({
  name: 'bookType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      bookTypeService.endpoints.samyakBookTypePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsBookTypePost = payload;
        // console.log('bookTypePayload?????????', payload);
      },
    );
  },
});

export const {} = bookTypeSlice.actions;

export default bookTypeSlice.reducer;
