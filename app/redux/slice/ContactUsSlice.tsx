import {createSlice} from '@reduxjs/toolkit';
import {contactUsService} from '../service/ContactUsService';

const initialState = {
  samyakContactUsDetailsPost: [],
};

export const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      contactUsService.endpoints.samyakContactUsPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakContactUsDetailsPost = payload;
        // console.log('contactUsDetails(((((((((((', payload);
      },
    );
  },
});

export const {} = contactUsSlice.actions;

export default contactUsSlice.reducer;
