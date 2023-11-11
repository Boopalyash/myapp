import {createSlice} from '@reduxjs/toolkit';
import {updateAddressService} from '../service/UpdateAddressService';

const initialState = {
  samyakDetailsUpdateAddressPost: [],
};

export const updateAddressSlice = createSlice({
  name: 'updateAddress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      updateAddressService.endpoints.samyakUpdateAddressPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsUpdateAddressPost = payload;
        console.log('updateAddressPayload?????????', payload);
      },
    );
  },
});

export const {} = updateAddressSlice.actions;

export default updateAddressSlice.reducer;
