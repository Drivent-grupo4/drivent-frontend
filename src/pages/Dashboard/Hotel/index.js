import { useState } from 'react';
import HotelComponent from '../../../components/Hotel';
import HotelConfirmation from '../../../components/HotelConfirmation';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { useEffect } from 'react';
import useBookings from '../../../hooks/api/useBooking';
import { getUserBooking } from '../../../services/bookingApi';
import { toast } from 'react-toastify';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  const [confirmation, setConfirmation] = useState(true);
  const [change, setChange] = useState(false);
  const { bookings } = useBookings();

  useEffect(async() => {
    try {
      const booking = await getUserBooking(token);
      if (booking) {
        setConfirmation(true);
      } else {
        setConfirmation(false);
      }
    } catch (e) {
      toast('Nenhuma reserva foi encontrada.');
    }
  }, []);

  return (
    <>
      {!bookings || !confirmation ? (
        <HotelComponent
          ticket={ticket}
          token={token}
          setConfirmation={setConfirmation}
          change={change}
          setChange={setChange}
        />
      ) : (
        <HotelConfirmation
          ticket={ticket}
          token={token}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          setChange={setChange}
        />
      )}
    </>
  );
}
