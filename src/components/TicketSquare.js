import styled from 'styled-components';

export default function TicketSquare({ info, index, setTicketPrice, setTicketTypeId, ticketTypeId, setShowHosting, setShowTotal, showHosting, showTotal }) {
  return (
    <TicketSquareStyle
      key={index}
      selectedStyle={ ticketTypeId === info.id }
      disabled={ showTotal | showHosting }
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

const TicketSquareStyle = styled.button`
  background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : ''} 
`;
