import useAsync from '../useAsync';
import * as roomApi from '../../services/roomApi';
import useToken from '../useToken';

export default function useRooms(hotelId) {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync(() => roomApi.getRooms(hotelId, token));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
