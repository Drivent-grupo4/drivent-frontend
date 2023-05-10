import styled from 'styled-components';
import { useState } from 'react';

export default function TicketSquare({ setTicketPrice, setShowTotal, setShowHosting, setTicketTypeId }) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  return (
    <>
      <TicketSquareStyle
        selectedStyle={ selectedStyle === 0 }
        onClick={() => {
          setShowHosting(true);
          setShowTotal(false);
          setSelectedStyle(0);
        }}
      >
        <h3>{'Presencial'}</h3> <p>R$ 250,00</p>
      </TicketSquareStyle>
      <TicketSquareStyle
        selectedStyle={ selectedStyle === 1 }
        onClick={() => {
          setTicketPrice(100);
          setShowHosting(false);
          setShowTotal(true);
          setTicketTypeId(1);
          setSelectedStyle(1);
        }}
      >
        <h3>{'Online'}</h3> <p>R$ 100,00</p>
      </TicketSquareStyle>
    </>
  );
}

const TicketSquareStyle = styled.button`
background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : '#FFFFFF'} 
`;
