import {NOTIFICATION_COUNT_COUNT} from '../../utils/URL';
import {api} from '../../utils/API';

export const notificationUpdateService = api.injectEndpoints({
  endpoints: build => ({
    samyakNotificationUpdatePost: build.mutation<any, any>({
      query: credentials => ({
        url: NOTIFICATION_COUNT_COUNT,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakNotificationUpdatePostMutation} =
  notificationUpdateService;
