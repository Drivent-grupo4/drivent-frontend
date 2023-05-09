import api from './api';

export async function getTickets(token) {
  const { data } = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
