import {LAB_TEST_PACKAGE} from '../../utils/URL';
import {api} from '../../utils/API';

export const labSearchTestService = api.injectEndpoints({
  endpoints: build => ({
    samyakLabSearchTestPost: build.mutation<any, any>({
      query: credentials => ({
        url: LAB_TEST_PACKAGE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakLabSearchTestPostMutation} = labSearchTestService;
