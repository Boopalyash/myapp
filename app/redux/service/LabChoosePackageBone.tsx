import {GET_PACKAGE_TEST_LIST} from '../../utils/URL';
import {api} from '../../utils/API';

export const labChooseBoneService = api.injectEndpoints({
  endpoints: build => ({
    samyakLabChooseBonePost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_PACKAGE_TEST_LIST,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakLabChooseBonePostMutation} = labChooseBoneService;
