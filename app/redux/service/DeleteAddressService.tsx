import {DELETE_ADDRESS} from '../../utils/URL';
import {api} from '../../utils/API';

export const deleteAddressService = api.injectEndpoints({
  endpoints: build => ({
    samyakDeleteAddressPost: build.mutation<any, any>({
      query: credentials => ({
        url: DELETE_ADDRESS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakDeleteAddressPostMutation} = deleteAddressService;
