import api from './api';

export async function getActivitiesDays(token) {
  const { data } = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
