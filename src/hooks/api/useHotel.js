import useToken from '../useToken';
import useAsync from '../useAsync';
import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotels,
    loading: loadingHotels,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelApi.getHotels(token));

  return { hotels, loadingHotels, hotelsError, getHotels };
}
