import {GET_ADDRESS} from '../../utils/URL';
import {api} from '../../utils/API';

export const getAddressPostService = api.injectEndpoints({
  endpoints: build => ({
    samyakAddressPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_ADDRESS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakAddressPostMutation} = getAddressPostService;
