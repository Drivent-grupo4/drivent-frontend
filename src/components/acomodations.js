import useRooms from '../hooks/api/useRoom';
import useBooking from '../hooks/api/useBooking';

export function getAccommodationTypes(hotelId) {
  const { rooms } = useRooms(hotelId);

  let accomodations = [];
  let hashmap = {};

  let roomList = rooms.Rooms;

  roomList.map((room) => (hashmap[room.capacity] = true));
  if (hashmap.hasOwnProperty(1)) {
    accomodations.push('Single');
  }
  if (hashmap.hasOwnProperty(2)) {
    accomodations.push('Double');
  }
  if (hashmap.hasOwnProperty(3)) {
    accomodations.push('Triple');
  }

  let text = accomodations.join(', ');

  return text;
}

export function getAvailability(hotelId) {
  const { bookings } = useBooking(hotelId);

  let occupied = 0;
  let total = 0;
  for (let item of bookings) {
    occupied += item._count.Booking;
    total += item.capacity;
  }
  return { occupied, total };
}
