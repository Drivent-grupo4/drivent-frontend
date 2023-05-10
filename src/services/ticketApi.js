import api from './api';

export async function getTickets(token) {
  const { data } = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function getTicketTypes(token) {
  const { data } = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function createTicket(payload, token) {
  const { data } = await api.post('/tickets', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
