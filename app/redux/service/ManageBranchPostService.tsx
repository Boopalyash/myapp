import {GET_BRANCH_DETAIL} from '../../utils/URL';
import {api} from '../../utils/API';

export const manageBranchService = api.injectEndpoints({
  endpoints: build => ({
    samyakManageBranchPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_BRANCH_DETAIL,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakManageBranchPostMutation} = manageBranchService;
