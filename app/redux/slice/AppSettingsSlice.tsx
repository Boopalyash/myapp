import {createSlice} from '@reduxjs/toolkit';
import {appSettingsService} from '../service/AppSettingsService';

const initialState = {
  samyakDetailsAppSettingsPost: [],
};

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      appSettingsService.endpoints.samyakAppSettingsPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsAppSettingsPost = payload;
        // console.log('appSettingsPayload?????????', payload);
      },
    );
  },
});

export const {} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
