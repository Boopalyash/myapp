import {CONFIG} from '../../utils/URL';
import {api} from '../../utils/API';

export const appSettingsService = api.injectEndpoints({
  endpoints: build => ({
    samyakAppSettingsPost: build.mutation<any, any>({
      query: credentials => ({
        url: CONFIG,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakAppSettingsPostMutation} = appSettingsService;
