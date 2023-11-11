import {createSlice} from '@reduxjs/toolkit';
import {getAddressPostService} from '../service/ManageAddressPostService';

const initialState = {
  samyakAddressDetailsPost: [],
};

export const getAddressPostSlice = createSlice({
  name: 'getAddressPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      getAddressPostService.endpoints.samyakAddressPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakAddressDetailsPost = payload.Message;
        console.log('getAddressDetails!!!!!!!!!!!!!!!!!', payload);
      },
    );
  },
});

export const {} = getAddressPostSlice.actions;

export default getAddressPostSlice.reducer;
