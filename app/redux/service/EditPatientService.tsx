import {EDIT_PATIENT} from '../../utils/URL';
import {api} from '../../utils/API';

export const editPatientService = api.injectEndpoints({
  endpoints: build => ({
    samyakEditPatientPost: build.mutation<any, any>({
      query: credentials => ({
        url: EDIT_PATIENT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakEditPatientPostMutation} = editPatientService;
