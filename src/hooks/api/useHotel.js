import useAsync from '../useAsync';
import useToken from '../useToken';

import { getHotels } from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel,
  } = useAsync(() => getHotels(token));

  return { hotel, hotelLoading, hotelError, getHotel };
}
