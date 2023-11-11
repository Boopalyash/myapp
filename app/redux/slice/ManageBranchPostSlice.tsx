import {createSlice} from '@reduxjs/toolkit';
import {manageBranchService} from '../service/ManageBranchPostService';

const initialState = {
  samyakDetailsManageBranchPost: [],
};

export const manageBranchSlice = createSlice({
  name: 'manageBranch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      manageBranchService.endpoints.samyakManageBranchPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsManageBranchPost = payload;
        console.log('manageBranchPayload__________', payload);
      },
    );
  },
});

export const {} = manageBranchSlice.actions;

export default manageBranchSlice.reducer;
