import Activity from './Activity';
import { useState } from 'react';

export function ActivitiesItens({ activities, dayId, placeId, token }) {
  const [color, setColor] = useState('#F1F1F1');
  const [selectedActivity, setSelectedActivity] = useState([]);

  return (
    <>
      {activities?.map((a, i) =>
        (a.ActivitiesDays.id === dayId && a.ActivitiesPlace.id === placeId) &&
        <Activity
          key={a.id}
          id={a.id}
          index={i}
          name={a.name}
          startTime={a.startTime}
          endTime={a.endTime}
          capacity={a.capacity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          color={color}
          setColor={setColor}
          token={token}
        />
      )}
    </>
  );
}
