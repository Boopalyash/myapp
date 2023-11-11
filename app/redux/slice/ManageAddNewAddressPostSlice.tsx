import {createSlice} from '@reduxjs/toolkit';
import {addNewAddress} from '../service/ManageAddNewAddressPostService';

const initialState = {
  samyakAddAddressDetailsPost: [],
};

export const addNewAddressSlice = createSlice({
  name: 'addNewAddressPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      addNewAddress.endpoints.samyakAddAddressPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakAddAddressDetailsPost = payload;
        console.log('addNewAddressDetails^^^^^^^^^^^^^^', payload);
      },
    );
  },
});

export const {} = addNewAddressSlice.actions;

export default addNewAddressSlice.reducer;
