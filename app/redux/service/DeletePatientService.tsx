import {DELETE_PATIENT} from '../../utils/URL';
import {api} from '../../utils/API';

export const deletePatientService = api.injectEndpoints({
  endpoints: build => ({
    samyakDeletePatientPost: build.mutation<any, any>({
      query: credentials => ({
        url: DELETE_PATIENT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakDeletePatientPostMutation} = deletePatientService;
