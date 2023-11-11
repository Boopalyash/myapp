import {UPDATE_RATINGS} from '../../utils/URL';
import {api} from '../../utils/API';

export const ratingService = api.injectEndpoints({
  endpoints: build => ({
    samyakRatingPost: build.mutation<any, any>({
      query: credentials => ({
        url: UPDATE_RATINGS,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakRatingPostMutation} = ratingService;
