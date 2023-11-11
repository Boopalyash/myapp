import {createSlice} from '@reduxjs/toolkit';
import {manageMemberListService} from '../service/ManageMemberListService';

const initialState = {
  samyakDetailsManageMembersListPost: [],
};

export const manageMemberListSlice = createSlice({
  name: 'manageMemberList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      manageMemberListService.endpoints.samyakManageMembersListPost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsManageMembersListPost = payload.Message;
        console.log('manageMemberListPayload?????????', payload);
      },
    );
  },
});

export const {} = manageMemberListSlice.actions;

export default manageMemberListSlice.reducer;
