import {NOTIFICATION_COUNT} from '../../utils/URL';
import {api} from '../../utils/API';

export const notificationCountService = api.injectEndpoints({
  endpoints: build => ({
    samyakNotificationCountPost: build.mutation<any, any>({
      query: credentials => ({
        url: NOTIFICATION_COUNT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakNotificationCountPostMutation} =
  notificationCountService;
