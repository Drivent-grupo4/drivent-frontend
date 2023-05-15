import styled from 'styled-components';
import { useState } from 'react';
import useCapacity from '../hooks/api/useCapacity';

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

function getCapacity(hotelId, rooms) {
  const { bookings } = useCapacity(hotelId);

  let total = 0;
  let occupancy = 0;
  if (bookings) {
    for (let item of bookings) {
      total += item.capacity;
      occupancy += item._count.Booking;
    }
  }
  return total - occupancy;
}

export default function HotelPlaceholder({ setHotelId, setSelectedStyle, selectedStyle, setShowHosting, listRooms, hotelId, hotel, index }) {
  const rooms = hotel.Rooms;

  let info = '';
  let capacity = 0;

  if (rooms) {
    info = getInfo(rooms);
    capacity = getCapacity(hotelId, rooms);
  }

  return (
    <>
      <HotelContainer
        selectedStyle={selectedStyle}
        index={index}
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
        <p>{info}</p>
        <h3>Vagas disponiveis:</h3>
        <p>{capacity}</p>
      </HotelContainer>
    </>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background: ${({ selectedStyle, index }) => selectedStyle === index ? '#ffeed2' : '#ebebeb'};
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
    margin-top: 5px;
    width: 118px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400px;
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
