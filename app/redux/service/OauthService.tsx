// import {api} from '../../utils/API';
// import {
//   GET_ADDRESS,
//   GET_PROMOTION,
//   HEALTH_TIPS,
//   LOGIN,
//   ORDER_BOOKING_LIST,
//   SIGN_UP,
//   SUBMIT_ADDRESS,
// } from '../../utils/URL';

// export const samyakService = api.injectEndpoints({
//   endpoints: build => ({
//     samyakLoginPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: LOGIN,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakSignUpPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: SIGN_UP,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakBookingListPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: ORDER_BOOKING_LIST,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakPromotionPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: GET_PROMOTION,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakHealthPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: HEALTH_TIPS,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakAddressPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: GET_ADDRESS,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     samyakAddAddressPost: build.mutation<any, any>({
//       query: credentials => ({
//         url: SUBMIT_ADDRESS,
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//   }),

//   overrideExisting: true,
// });

// export const {
//   useSamyakLoginPostMutation,
//   useSamyakSignUpPostMutation,
//   useSamyakBookingListPostMutation,
//   useSamyakPromotionPostMutation,
//   useSamyakHealthPostMutation,
//   useSamyakAddressPostMutation,
//   useSamyakAddAddressPostMutation,
// } = samyakService;

import {api} from '../../utils/API';
import {LOGIN, SIGN_UP} from '../../utils/URL';

export const oauthService = api.injectEndpoints({
  endpoints: build => ({
    samyakLoginPost: build.mutation<any, any>({
      query: credentials => ({
        url: LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    samyakSignUpPost: build.mutation<any, any>({
      query: credentials => ({
        url: SIGN_UP,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakLoginPostMutation, useSamyakSignUpPostMutation} =
  oauthService;
