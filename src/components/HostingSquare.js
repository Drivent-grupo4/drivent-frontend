import { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../contexts/TicketContext';

export default function HostingSquare({ setTicketPrice, setShowTotal, setTicketTypeId }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const { setWithHotel } = useContext(TicketContext);

  return (
    <>
      <HostingSquareStyle
        selectedStyle={selectedStyle === 3}
        onClick={() => {
          setTicketPrice(250);
          setShowTotal(true);
          setTicketTypeId(3);
          setSelectedStyle(3);
          setWithHotel(false);
        }}
      >
        <h3>Sem Hotel<p>+ R$ 0</p></h3>
      </HostingSquareStyle>
      <HostingSquareStyle
        selectedStyle={ selectedStyle === 2}
        onClick={() => {
          setTicketPrice(600);
          setShowTotal(true);
          setTicketTypeId(2);
          setSelectedStyle(2);
          setWithHotel(true);
        }}
      >
        <h3>Com Hotel<p>+ R$ 350</p></h3>
      </HostingSquareStyle>
    </>
  );
}

const HostingSquareStyle = styled.button`
background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : '#FFFFFF'} 
`;
