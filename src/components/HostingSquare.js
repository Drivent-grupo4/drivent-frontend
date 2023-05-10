import styled from 'styled-components';

export default function HostingSquare({ info, index, setTicketPrice, setHotelTypeId, hotelTypeId, setShowTotal }) {
  const noHotel = index === 0;

  return (
    <HostingSquareStyle
      key={index}
      selectedStyle={ hotelTypeId === info.id }
      onClick={() => {
        setTicketPrice((prevState) => prevState + (noHotel ? 0 : 250));
        setHotelTypeId(info.id);
        setShowTotal(true);
      }}
    >
      <h3>{noHotel ? 'Sem Hotel' : 'Com Hotel'}</h3> <p>+ R$ {noHotel ? '0' : '250'}</p>
    </HostingSquareStyle>
  );
}

const HostingSquareStyle = styled.div`
  background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : ''} 
`;
