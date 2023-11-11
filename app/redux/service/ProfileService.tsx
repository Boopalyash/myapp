import {USER_INFO} from '../../utils/URL';
import {api} from '../../utils/API';

export const profileService = api.injectEndpoints({
  endpoints: build => ({
    samyakProfilePost: build.mutation<any, any>({
      query: credentials => ({
        url: USER_INFO,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakProfilePostMutation} = profileService;
