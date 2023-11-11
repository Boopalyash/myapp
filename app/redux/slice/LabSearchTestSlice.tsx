import {createSlice} from '@reduxjs/toolkit';
import {labSearchTestService} from '../service/LabSearchTestService';

const initialState = {
  samyakDetailsLabSearchTestPost: [],
};

export const labSearchTestSlice = createSlice({
  name: 'labSearchTest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      labSearchTestService.endpoints.samyakLabSearchTestPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsLabSearchTestPost = payload;
        console.log('labSearchTestPayload?????????', payload);
      },
    );
  },
});

export const {} = labSearchTestSlice.actions;

export default labSearchTestSlice.reducer;
