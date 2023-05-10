import styled from 'styled-components';

export default function TicketSquare({ info, index, setTicketPrice, setTicketTypeId, ticketTypeId, setShowHosting, setShowTotal }) {
  return (
    <TicketSquareStyle
      key={index}
      selectedStyle={ ticketTypeId === info.id }
      onClick={() => {
        setTicketPrice(info.price);
        setTicketTypeId(info.id);
        setShowHosting(info.includesHotel);
        !info.includesHotel && setShowTotal(true);
      }}
    >
      <h3>{info.name}</h3> <p>R$ {info.price.toString()}</p>
    </TicketSquareStyle>
  );
}

const TicketSquareStyle = styled.div`
  background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : ''} 
`;
