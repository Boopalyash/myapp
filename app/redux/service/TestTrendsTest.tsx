import {TRENDS_PATIENT} from '../../utils/URL';
import {api} from '../../utils/API';

export const testTrendsService = api.injectEndpoints({
  endpoints: build => ({
    samyakTestTrendsPost: build.mutation<any, any>({
      query: credentials => ({
        url: TRENDS_PATIENT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakTestTrendsPostMutation} = testTrendsService;
