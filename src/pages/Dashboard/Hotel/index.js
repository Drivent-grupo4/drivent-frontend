import { useState } from 'react';
import HotelComponent from '../../../components/Hotel';
import HotelConfirmation from '../../../components/HotelConfirmation';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { useEffect } from 'react';
import useBookings from '../../../hooks/api/useBooking';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  const [confirmation, setConfirmation] = useState(true);
  const [change, setChange] = useState(false);
  const [room, setRoom] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [userBooking, setUserBooking] = useState('');
  const { bookings } = useBookings();
  
  useEffect(async() => {
    if (bookings) {
      setConfirmation(true);
      setChange(!change);
      setRoom(bookings.Room);
      setUserBooking(bookings.id);
      setHotelName(bookings.Room.Hotel);
    } else {
      setConfirmation(false);
    }
  }, [bookings, userBooking]);

  return (
    <>
      {!confirmation ? (
        <HotelComponent
          ticket={ticket}
          token={token}
          setConfirmation={setConfirmation}
          change={change}
          setChange={setChange}
          room={room}
          setRoom={setRoom}
          setHotelName={setHotelName}
          hotelName={hotelName}
          userBooking={userBooking}
          setUserBooking={setUserBooking}
        />
      ) : (
        <HotelConfirmation
          ticket={ticket}
          token={token}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          setChange={setChange}
          change={change}
          room={room}
          setRoom={setRoom}
          setHotelName={setHotelName}
          hotelName={hotelName}
        />
      )}
    </>
  );
}
