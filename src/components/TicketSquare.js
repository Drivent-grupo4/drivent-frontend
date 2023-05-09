import { useState } from 'react';
import styled from 'styled-components';

export default function TicketSquare({ info, index, setTicketPrice, setTicketTypeId }) {
  const [selected, setSelected] = useState(false);

  return (
    <TicketSquareStyle
      key={index}
      selectedStyle={ selected }
      onClick={() => {
        setTicketPrice(info.price);
        setTicketTypeId({ ticketTypeId: info.id });
        setSelected(true);
      }}
    >
      <h3>{info.name}</h3> <p>R$ {info.price.toString()}</p>
    </TicketSquareStyle>
  );
}

const TicketSquareStyle = styled.div`
  background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : ''} 
`;
