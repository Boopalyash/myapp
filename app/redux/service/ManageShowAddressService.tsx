import {GET_ADDRESS_TYPE} from '../../utils/URL';
import {api} from '../../utils/API';

export const manageShowAddressService = api.injectEndpoints({
  endpoints: build => ({
    samyakManageShowAddressPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_ADDRESS_TYPE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakManageShowAddressPostMutation} =
  manageShowAddressService;
