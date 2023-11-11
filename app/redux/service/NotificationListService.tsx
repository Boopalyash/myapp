import {NOTIFICATION_LIST} from '../../utils/URL';
import {api} from '../../utils/API';

export const notificationListService = api.injectEndpoints({
  endpoints: build => ({
    samyakNotificationListPost: build.mutation<any, any>({
      query: credentials => ({
        url: NOTIFICATION_LIST,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSamyakNotificationListPostMutation} = notificationListService;
