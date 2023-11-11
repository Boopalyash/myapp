import {GET_RELATIONSHIP} from '../../utils/URL';
import {api} from '../../utils/API';

export const relationshipService = api.injectEndpoints({
  endpoints: build => ({
    samyakRelationshipPost: build.mutation<any, any>({
      query: credentials => ({
        url: GET_RELATIONSHIP,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakRelationshipPostMutation} = relationshipService;
