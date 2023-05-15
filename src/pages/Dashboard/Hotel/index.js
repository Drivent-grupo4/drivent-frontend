import HotelComponent from '../../../components/Hotel';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
//import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  //const { hotels, loadingHotels } = useHotel();

  return (
    <>
      <HotelComponent ticket={ticket} token={token} />
    </>
  );
}
