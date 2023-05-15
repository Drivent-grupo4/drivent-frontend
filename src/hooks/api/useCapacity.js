import useAsync from '../useAsync';
import * as bookingApi from '../../services/bookingApi';
import useToken from '../useToken';

export default function useCapacity(hotelId) {
  const token = useToken();

  const {
    data: bookings,
    loading: bookingsLoading,
    error: bookingsError,
    act: getBookings,
  } = useAsync(() => bookingApi.getBookings(hotelId, token));

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    getBookings,
  };
}
