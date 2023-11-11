import {GET_PROMOTION} from '../../utils/URL';
import {api} from '../../utils/API';

export const promotionPostService = api.injectEndpoints({
  endpoints: build => ({
    samyakPromotionPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_PROMOTION,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakPromotionPostMutation} = promotionPostService;
