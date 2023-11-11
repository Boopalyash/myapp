import {GET_GENDER} from '../../utils/URL';
import {api} from '../../utils/API';

export const editGenderService = api.injectEndpoints({
  endpoints: build => ({
    samyakEditGenderPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_GENDER,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakEditGenderPostMutation} = editGenderService;
