import {createSlice} from '@reduxjs/toolkit';
import {notificationUpdateService} from '../service/NotificationUpdateService';

const initialState = {
  samyakDetailsNotificationUpdatePost: [],
};

export const notificationUpdateSlice = createSlice({
  name: 'notificationUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notificationUpdateService.endpoints.samyakNotificationUpdatePost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsNotificationUpdatePost = payload;
      },
    );
  },
});

export const {} = notificationUpdateSlice.actions;

export default notificationUpdateSlice.reducer;
