import { useState } from 'react';
import { createContext } from 'react';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [withHotel, setWithHotel] = useState();
  
  return (
    <TicketContext.Provider value={{ ticketPrice, setTicketPrice, withHotel, setWithHotel }}>
      {children}
    </TicketContext.Provider>
  );
};
