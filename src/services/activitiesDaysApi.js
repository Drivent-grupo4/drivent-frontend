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

export async function getUserActivities(token) {
  const { data } = await api.get('/activities/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getActivitiesBookings(activitiesId, token) {
  const { data } = await api.get(`/activities/booking/${activitiesId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function bookActivity(activitiesId, token) {
  const { data } = await api.post(`/activities/booking/${activitiesId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
