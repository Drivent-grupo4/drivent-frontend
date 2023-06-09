import useAsync from '../useAsync';
import * as bookingApi from '../../services/bookingApi';
import useToken from '../useToken';

export default function useBookings() {
  const token = useToken();

  const {
    data: bookings,
    loading: bookingsLoading,
    error: bookingsError,
    act: getUserBooking,
  } = useAsync(() => bookingApi.getUserBooking(token));

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    getUserBooking,
  };
}
