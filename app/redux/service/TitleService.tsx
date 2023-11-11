import {GET_TITLE} from '../../utils/URL';
import {api} from '../../utils/API';

export const titleService = api.injectEndpoints({
  endpoints: build => ({
    samyakTitlePost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_TITLE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakTitlePostMutation} = titleService;
