import { useState } from 'react';
import HotelComponent from '../../../components/Hotel';
import HotelConfirmation from '../../../components/HotelConfirmation';
import useBooking from '../../../hooks/api/useBooking';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { ticket } = useTicket();
  const { token } = useToken();
  const [confirmation, setConfirmation] = useState(false);
  const [change, setChange] = useState(false);
  
  return (
    <>
      {!confirmation ? (
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
