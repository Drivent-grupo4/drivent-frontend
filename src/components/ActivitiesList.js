import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { getActivitiesPlaces, getAllActivities } from '../services/activitiesDaysApi';
import useToken from '../hooks/useToken';
import { ActivitiesItens } from './Activities';

export function ActivitiesList({ id }) {
  const token = useToken();
  const [activities, setActivities] = useState();
  const [places, setPlaces] = useState();
  useEffect(async() => {
    const allActivities = await getAllActivities(token);
    const allPlaces = await getActivitiesPlaces(token);
    setActivities(allActivities);
    setPlaces(allPlaces);
  }, [id]);
  return (
    <Container>
      {activities && places && (
        <>
          {places?.map((p, i) =>
            <Boxes>
              <ActivitiesPlace key={p.namePlace}><h1>{p.namePlace}</h1></ActivitiesPlace>
              <ActivitiesBox>
                {activities && id && p.id && (
                  <List>
                    <ActivitiesItens activities={activities} dayId={id} placeId={p.id} token={token} />
                  </List>
                )
                }
              </ActivitiesBox>
            </Boxes>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 864px;
  height: 391px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const Boxes = styled.div`
  display: block;
  width: 100%;
`;

const ActivitiesBox = styled.div`
  height: 391px;
  border: 1px solid #D7D7D7;
  display: block;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ActivitiesPlace = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  text-align: center;
  display: block;
  margin-top: 20px;

  h1{
      font-family: Roboto, sans-serif;
      font-size: 17px;
      color: #7b7b7b;
  }
`;

const List = styled.div`
  display: block;
  justify-content: center;
`;
