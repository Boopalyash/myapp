import {createSlice} from '@reduxjs/toolkit';
import {labChooseBoneService} from '../service/LabChoosePackageBone';

const initialState = {
  samyakDetailsLabChooseBonePost: [],
};

export const labChooseBoneSlice = createSlice({
  name: 'chooseBoneProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      labChooseBoneService.endpoints.samyakLabChooseBonePost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsLabChooseBonePost = payload;
        console.log('ChooseBonePayload?????????', payload);
      },
    );
  },
});

export const {} = labChooseBoneSlice.actions;

export default labChooseBoneSlice.reducer;
