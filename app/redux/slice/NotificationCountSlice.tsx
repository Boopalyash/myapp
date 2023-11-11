import {createSlice} from '@reduxjs/toolkit';
import {notificationCountService} from '../service/NotificationCountService';

const initialState = {
  samyakNotificationCountDetailsPost: [],
};

export const notificationCountSlice = createSlice({
  name: 'notificationCount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notificationCountService.endpoints.samyakNotificationCountPost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakNotificationCountDetailsPost = payload;
        console.log('notificationCountDetails^^^^^^^^^^^^^^', payload);
      },
    );
  },
});

export const {} = notificationCountSlice.actions;

export default notificationCountSlice.reducer;
