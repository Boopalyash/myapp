import {ORDER_BOOKING_LIST} from '../../utils/URL';
import {api} from '../../utils/API';

export const bookingListPostService = api.injectEndpoints({
  endpoints: build => ({
    samyakBookingListPost: build.mutation<any, any>({
      query: credentials => ({
        url: ORDER_BOOKING_LIST,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakBookingListPostMutation} = bookingListPostService;
