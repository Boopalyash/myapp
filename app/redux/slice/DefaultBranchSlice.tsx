import {createSlice} from '@reduxjs/toolkit';
import {defaultBranchService} from '../service/DefaultBranchService';

const initialState = {
  samyakDetailsDefaultBranchPost: [],
};

export const defaultBranchSlice = createSlice({
  name: 'defaultBranch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      defaultBranchService.endpoints.samyakDefaultBranchPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsDefaultBranchPost = payload;
        // console.log('defaultBranchPayload?????????', payload);
      },
    );
  },
});

export const {} = defaultBranchSlice.actions;

export default defaultBranchSlice.reducer;
