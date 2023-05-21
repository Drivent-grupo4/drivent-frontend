import api from './api';

export async function getBookings(hotelId, token) {
  const { data } = await api.get(`/hotels/bookings/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getUserBooking(token) {
  const { data } = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function saveBooking(body, token) {
  const { data } = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
