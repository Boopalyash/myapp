import {createSlice} from '@reduxjs/toolkit';
import {promotionPostService} from '../service/DashBoardPromotionService';

const initialState = {
  samyakPromotionDetailsPost: [],
};

export const promotionPostSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      promotionPostService.endpoints.samyakPromotionPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakPromotionDetailsPost = payload.Message;
        // console.log('promotionPayload?????????', payload);
      },
    );
  },
});

export const {} = promotionPostSlice.actions;

export default promotionPostSlice.reducer;
