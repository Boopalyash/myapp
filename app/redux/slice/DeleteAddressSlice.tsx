import {createSlice} from '@reduxjs/toolkit';
import {deleteAddressService} from '../service/DeleteAddressService';

const initialState = {
  samyakDetailsDeleteAddressPost: [],
};

export const deleteAddressSlice = createSlice({
  name: 'deleteAddress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      deleteAddressService.endpoints.samyakDeleteAddressPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsDeleteAddressPost = payload;
        console.log('deleteAddressPayload?????????', payload);
      },
    );
  },
});

export const {} = deleteAddressSlice.actions;

export default deleteAddressSlice.reducer;
