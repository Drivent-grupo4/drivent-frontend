import HotelComponent from '../../../components/Hotel';
import useHotel from '../../../hooks/api/useHotel';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  const { hotels } = useHotel();

  return (
    <>
      <HotelComponent ticket={ticket} token={token} hotels={hotels}/>
    </>
  );
};
