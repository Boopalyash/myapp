import {GET_BOOKING_TYPES} from '../../utils/URL';
import {api} from '../../utils/API';

export const bookTypeService = api.injectEndpoints({
  endpoints: build => ({
    samyakBookTypePost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_BOOKING_TYPES,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakBookTypePostMutation} = bookTypeService;
