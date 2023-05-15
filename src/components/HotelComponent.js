import styled from 'styled-components';
import { useState } from 'react';
import useToken from '../hooks/useToken';
import { getRooms } from '../services/roomApi';
import useRooms from '../hooks/api/useRoom';

function getInfo(rooms) {
  let accomodations = [];

  let single = false;
  let double = false;
  let triple = false;

  rooms.forEach((room) => {
    if (room.capacity === 1) single = true;
    if (room.capacity === 2) double = true;
    if (room.capacity === 3) triple = true;
  });

  if (single) accomodations.push('Single');
  if (double) accomodations.push('Double');
  if (triple) accomodations.push('Triple');
  let info = accomodations.join(', ');

  return info;
}

async function listRooms(id) {
  const token = useToken();
  const data = await getRooms(id, token);
  const rooms = data.Rooms;

  return rooms;
}

export default function HotelPlaceholder({ setHotelId, setShowHosting, hotelId, hotel, index }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const rooms = listRooms(hotelId);
  console.log(rooms);

  let info = '';

  if (rooms) {
    info = getInfo(rooms);
  }

  return (
    <>
      <HotelContainer
        selectedStyle={selectedStyle === index}
        onClick={() => {
          setSelectedStyle(index);
          setHotelId(hotelId);
          setShowHosting(true);
          listRooms(hotelId);
        }}
      >
        <HotelThumb src={hotel.image} alt="new" />
        <h4>{hotel.name}</h4>
        <h3>Tipo de acomodações:</h3>
        <p>{}</p>
        <h3>Vagas disponiveis:</h3>
        {/* <p>{getAvailability(hotel.id)}</p> */}
      </HotelContainer>
    </>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background: ${({ selectedStyle }) => selectedStyle ? '#ffeed2' : '#ebebeb'};
  border-radius: 10px;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #343434;
    margin-left: 15px;
    margin-top: 10px;
  }
  h3 {
    font-size: 13px;
    font-weight: 700px;
    margin-left: 15px;
    margin-top: 10px;
  }
  p {
    margin-left: 15px;
    margin-top: 2px;
    width: 118px;
    font-family: 'Roboto';
    font-size: 12px;
    color: #3C3C3C;
  }
`;

const HotelThumb = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  margin-left: 14px;
  margin-top: 16px;
`;
