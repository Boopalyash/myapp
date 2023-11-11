import {UPDATE_PROFILE} from '../../utils/URL';
import {api} from '../../utils/API';

export const profileUpdateService = api.injectEndpoints({
  endpoints: build => ({
    samyakProfileUpdatePost: build.mutation<any, any>({
      query: credentials => ({
        url: UPDATE_PROFILE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakProfileUpdatePostMutation} = profileUpdateService;
