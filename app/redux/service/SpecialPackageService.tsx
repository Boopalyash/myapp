import {SPECIAL_PACKAGE} from '../../utils/URL';
import {api} from '../../utils/API';

export const specialPackageService = api.injectEndpoints({
  endpoints: build => ({
    samyakSpecialPackagePost: build.mutation<any, any>({
      query: credentials => ({
        url: SPECIAL_PACKAGE,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakSpecialPackagePostMutation} = specialPackageService;
