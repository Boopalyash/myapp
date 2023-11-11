import {OTP_SEND} from '../../utils/URL';
import {api} from '../../utils/API';

export const forgetPasswordService = api.injectEndpoints({
  endpoints: build => ({
    samyakForgetPasswordPost: build.mutation<any, any>({
      query: credentials => ({
        url: OTP_SEND,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakForgetPasswordPostMutation} = forgetPasswordService;
