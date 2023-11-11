import {ABOUT_US} from '../../utils/URL';
import {api} from '../../utils/API';

export const aboutUsService = api.injectEndpoints({
  endpoints: build => ({
    samyakAboutUsPost: build.mutation<any, any>({
      query: credentials => ({
        url: ABOUT_US,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakAboutUsPostMutation} = aboutUsService;
