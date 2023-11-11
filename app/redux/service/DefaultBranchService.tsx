import {USER_VS_DEFAULT_BRANCH} from '../../utils/URL';
import {api} from '../../utils/API';

export const defaultBranchService = api.injectEndpoints({
  endpoints: build => ({
    samyakDefaultBranchPost: build.mutation<any, any>({
      query: credentials => ({
        url: USER_VS_DEFAULT_BRANCH,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakDefaultBranchPostMutation} = defaultBranchService;
