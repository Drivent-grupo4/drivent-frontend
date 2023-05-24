import api from './api';

export async function getActivitiesDays(token) {
  const { data } = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getAllActivities(token) {
  const { data } = await api.get('/activities/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getActivitiesPlaces(token) {
  const { data } = await api.get('/activities/places', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
