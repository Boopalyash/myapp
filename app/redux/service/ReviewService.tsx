import {POST_REVIEWS} from '../../utils/URL';
import {api} from '../../utils/API';

export const reviewService = api.injectEndpoints({
  endpoints: build => ({
    samyakReviewPost: build.mutation<any, any>({
      query: credentials => ({
        url: POST_REVIEWS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakReviewPostMutation} = reviewService;
