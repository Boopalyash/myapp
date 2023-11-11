import {HEALTH_TIPS} from '../../utils/URL';
import {api} from '../../utils/API';

export const healthTipsPostService = api.injectEndpoints({
  endpoints: build => ({
    samyakHealthPost: build.mutation<any, any>({
      query: credentials => ({
        url: HEALTH_TIPS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakHealthPostMutation} = healthTipsPostService;
