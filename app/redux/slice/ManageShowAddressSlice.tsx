import {createSlice} from '@reduxjs/toolkit';
import {manageShowAddressService} from '../service/ManageShowAddressService';

const initialState = {
  samyakDetailsManageShowAddressPost: [],
};

export const manageShowAddressSlice = createSlice({
  name: 'showAddress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      manageShowAddressService.endpoints.samyakManageShowAddressPost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsManageShowAddressPost = payload;
        console.log('showAddressPayload**********', payload);
      },
    );
  },
});

export const {} = manageShowAddressSlice.actions;

export default manageShowAddressSlice.reducer;
