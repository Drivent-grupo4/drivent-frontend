import HotelComponent from '../../../components/Hotel';
import HotelConfirmation from '../../../components/HotelConfirmation';
import useBooking from '../../../hooks/api/useBooking';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  const { bookings } = useBooking();

  return (
    <>
      {!bookings ? <HotelComponent ticket={ticket} token={token} />
        : <HotelConfirmation ticket={ticket} token={token} />}

    </>
  );
}
