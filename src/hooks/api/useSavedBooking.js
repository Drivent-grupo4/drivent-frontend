import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useSaveBooking() {
  const token = useToken();

  const {
    data: savedBooking,
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking
  } = useAsync((data) => bookingApi.saveBooking(data, token), false);

  return {
    savedBooking,
    saveBookingLoading,
    saveBookingError,
    saveBooking
  };
}
