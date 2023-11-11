import {ADD_PATIENT} from '../../utils/URL';
import {api} from '../../utils/API';

export const addMemberListService = api.injectEndpoints({
  endpoints: build => ({
    samyakAddMemberListPost: build.mutation<any, any>({
      query: credentials => ({
        url: ADD_PATIENT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakAddMemberListPostMutation} = addMemberListService;
