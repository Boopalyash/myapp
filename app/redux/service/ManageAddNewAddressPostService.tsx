import {SUBMIT_ADDRESS} from '../../utils/URL';
import {api} from '../../utils/API';

export const addNewAddress = api.injectEndpoints({
  endpoints: build => ({
    samyakAddAddressPost: build.mutation<any, any>({
      query: credentials => ({
        url: SUBMIT_ADDRESS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakAddAddressPostMutation} = addNewAddress;
