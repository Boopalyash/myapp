import {GET_PATIENT} from '../../utils/URL';
import {api} from '../../utils/API';

export const manageMemberListService = api.injectEndpoints({
  endpoints: build => ({
    samyakManageMembersListPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_PATIENT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakManageMembersListPostMutation} = manageMemberListService;
