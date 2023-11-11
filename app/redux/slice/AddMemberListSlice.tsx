import {createSlice} from '@reduxjs/toolkit';
import {addMemberListService} from '../service/AddMemberListService';

const initialState = {
  samyakDetailsAddMemberListPost: [],
};

export const addMemberListSlice = createSlice({
  name: 'addMemberList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      addMemberListService.endpoints.samyakAddMemberListPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsAddMemberListPost = payload;
      },
    );
  },
});

export const {} = addMemberListSlice.actions;

export default addMemberListSlice.reducer;
