import useAsync from '../useAsync';
import * as activityAPI from '../../services/activitiesDaysApi';
import useToken from '../useToken';

export default function useActivityCapacity(activityId) {
  const token = useToken();

  const {
    data: bookings,
    loading: bookingsLoading,
    error: bookingsError,
    act: getActivitiesBookings,
  } = useAsync(() => activityAPI.getActivitiesBookings(activityId, token));

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    getActivitiesBookings,
  };
}
