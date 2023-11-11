// import {createSlice} from '@reduxjs/toolkit';
// import {samyakService} from '../service/OauthService';

// const initialState = {
//   samyakDetails: [],
//   tokenDetails: [],
//   samyakDetailsPostSignUp: [],
//   samyakDetailsBookingListPost: [],
//   samyakPromotionDetailsPost: [],
//   samyakHealthDetailsPost: [],
//   samyakAddressDetailsPost: [],
//   samyakAddAddressDetailsPost: [],
// };
// export const samyakSlice = createSlice({
//   name: 'samyak',
//   initialState,
//   reducers: {
//     setTokenDetails: (state, action) => {
//       state.tokenDetails = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder.addMatcher(
//       samyakService.endpoints.samyakLoginPost.matchFulfilled,
//       (state, {payload}) => {
//         if (payload.Code === 200) {
//           console.log('APISUCCESS----------------------->', payload.Message);
//           state.samyakDetails = payload.Message;
//         }
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakSignUpPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakDetailsPostSignUp = payload;
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakBookingListPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakDetailsBookingListPost = payload.Message;
//         console.log('payload?????????', payload);
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakPromotionPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakPromotionDetailsPost = payload.Message;
//         console.log('promotionDetails&&&&&&&&&&&&&&&&&&', payload);
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakHealthPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakHealthDetailsPost = payload.Message;
//         console.log('HealthDetails@@@@@@@@@@@@@@@@', payload);
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakAddressPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakAddressDetailsPost = payload.Message;
//         console.log('AddressDetails!!!!!!!!!!!!!!!!!', payload);
//       },
//     );
//     builder.addMatcher(
//       samyakService.endpoints.samyakAddAddressPost.matchFulfilled,
//       (state, {payload}) => {
//         state.samyakAddAddressDetailsPost = payload;
//         console.log('AddAddressDetails^^^^^^^^^^^^^^', payload);
//       },
//     );
//   },
// });

// export const {setTokenDetails} = samyakSlice.actions;

// export default samyakSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {oauthService} from '../service/OauthService';

const initialState = {
  samyakDetails: [],
  samyakDetailsPostSignUp: [],
};

export const oauthSlice = createSlice({
  name: 'samyak',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      oauthService.endpoints.samyakLoginPost.matchFulfilled,
      (state, {payload}) => {
        if (payload.Code === 200) {
          console.log('APISUCCESS----------------------->', payload.Message);
          state.samyakDetails = payload.Message;
        }
      },
    );
    builder.addMatcher(
      oauthService.endpoints.samyakSignUpPost.matchFulfilled,
      (state, {payload}) => {
        state.samyakDetailsPostSignUp = payload;
      },
    );
  },
});

export const {} = oauthSlice.actions;

export default oauthSlice.reducer;
