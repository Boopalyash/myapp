import {CONTACT_US} from '../../utils/URL';
import {api} from '../../utils/API';

export const contactUsService = api.injectEndpoints({
  endpoints: build => ({
    samyakContactUsPost: build.mutation<any, any>({
      query: credentials => ({
        url: CONTACT_US,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakContactUsPostMutation} = contactUsService;
