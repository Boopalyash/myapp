import {PATIENT_TEST_LIST} from '../../utils/URL';
import {api} from '../../utils/API';

export const trendsPatientListService = api.injectEndpoints({
  endpoints: build => ({
    samyakTrendsPatientListPost: build.mutation<any, any>({
      query: credentials => ({
        url: PATIENT_TEST_LIST,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakTrendsPatientListPostMutation} =
  trendsPatientListService;
