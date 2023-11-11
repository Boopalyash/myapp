import {UPDATE_ADDRESS} from '../../utils/URL';
import {api} from '../../utils/API';

export const updateAddressService = api.injectEndpoints({
  endpoints: build => ({
    samyakUpdateAddressPost: build.mutation<any, any>({
      query: credentials => ({
        url: UPDATE_ADDRESS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakUpdateAddressPostMutation} = updateAddressService;
