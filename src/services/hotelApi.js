import api from './api';

export async function getHotels(token) {
  const { data } = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
