import {createSlice} from '@reduxjs/toolkit';
import {notificationListService} from '../service/NotificationListService';

const initialState = {
  samyakNotificationListDetailsPost: [],
};

export const notificationListSlice = createSlice({
  name: 'notificationList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      notificationListService.endpoints.samyakNotificationListPost
        .matchFulfilled,
      (state, {payload}) => {
        state.samyakNotificationListDetailsPost = payload;
        console.log('notificationListDetails^^^^^^^^^^^^^^', payload);
      },
    );
  },
});

export const {} = notificationListSlice.actions;

export default notificationListSlice.reducer;
