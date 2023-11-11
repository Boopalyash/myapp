import {createSlice} from '@reduxjs/toolkit';
import {trendsPatientListService} from '../service/TrendsPatientList';

const initialState = {
  samyakDetailsTrendsPatientListPost: [],
};

export const trendsPatientListSlice = createSlice({
  name: 'trendsPatientList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      trendsPatientListService.endpoints.samyakTrendsPatientListPost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsTrendsPatientListPost = payload;
        console.log('trendsPatientListPayload?????????', payload);
      },
    );
  },
});

export const {} = trendsPatientListSlice.actions;

export default trendsPatientListSlice.reducer;
