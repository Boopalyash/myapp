import {createSlice} from '@reduxjs/toolkit';
import {healthTipsPostService} from '../service/DashBoardHealthTipsPostService';

const initialState = {
  samyakHealthDetailsPost: [],
};

export const healthTipsPostSlice = createSlice({
  name: 'healthTips',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      healthTipsPostService.endpoints.samyakHealthPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakHealthDetailsPost = payload.Message;
        // console.log('HealthDetails@@@@@@@@@@@@@@@@', payload);
      },
    );
  },
});

export const {} = healthTipsPostSlice.actions;

export default healthTipsPostSlice.reducer;
