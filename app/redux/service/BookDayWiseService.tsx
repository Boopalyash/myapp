import {GET_BOOKING_SLOT_DAYWISE} from '../../utils/URL';
import {api} from '../../utils/API';

export const BookDayWiseService = api.injectEndpoints({
  endpoints: build => ({
    samyakBookDayWisePost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_BOOKING_SLOT_DAYWISE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakBookDayWisePostMutation} = BookDayWiseService;
