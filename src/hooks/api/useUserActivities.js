import useAsync from '../useAsync';
import * as activityAPI from '../../services/activitiesDaysApi';
import useToken from '../useToken';

export default function useUserActivities() {
  const token = useToken();

  const {
    data: bookings,
    loading: bookingsLoading,
    error: bookingsError,
    act: getUserActivities,
  } = useAsync(() => activityAPI.getUserActivities(token));

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    getUserActivities,
  };
}
