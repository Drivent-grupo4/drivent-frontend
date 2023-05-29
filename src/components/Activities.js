import styled from 'styled-components';
import { EnterOutline, CloseCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';
import { useState } from 'react';

export function ActivitiesItens({ activities, dayId, placeId }) {
  const [color, setColor] = useState('#F1F1F1');
  const [selectedActivity, setSelectedActivity] = useState([]);

  function handleTime(startTime, endTime) {
    const hoursDif = Number(endTime.slice(11, 13)) - Number(startTime.slice(11, 13));
    const minDif = Math.abs(Number(endTime.slice(14, 16)) - Number(startTime.slice(14, 16))) / 60;

    const res = hoursDif + minDif;

    return res;
  }

  function bookActivity(id) {
    setColor('#D0FFDB');
    setSelectedActivity([...selectedActivity, id]);
  }

  return (
    <>
      {activities?.map((a, i) =>
        (a.ActivitiesDays.id === dayId && a.ActivitiesPlace.id === placeId) &&
        <ActivitiesInfo onClick={() => bookActivity(a.id)} background={selectedActivity.includes(a.id) ? color : '#F1F1F1'} key={i + a.id} heightmod={handleTime(a.startTime, a.endTime)} >
          <Info>
            <h1>{a.name}</h1>
            <h2>{a.startTime.slice(11, 16)} - {a.endTime.slice(11, 16)}</h2>
          </Info>
          {selectedActivity.includes(a.id) ?
            (
              <CapacityContainer>
                <Checkmark
                  color={'green'}
                  title={''}
                  height="19px"
                  width="19px"
                />
                <Capacity color={'green'}>Inscrito</Capacity>
              </CapacityContainer>
            )

            :
            (a.capacity === 0 ?
              <CapacityContainer>
                <NoCapacity
                  color={'red'}
                  title={''}
                  height="20px"
                  width="20px"
                />
                <Capacity color={'red'}>Esgotado</Capacity>
              </CapacityContainer> :
              <CapacityContainer>
                <Enter
                  color={'green'}
                  title={''}
                  height="20px"
                  width="20px"
                />
                <Capacity color={'green'}>{a.capacity} vagas</Capacity>
              </CapacityContainer>
            )}
        </ActivitiesInfo>
      )}
    </>
  );
}

const ActivitiesInfo = styled.div`
  justify-content: center;
  object-fit: contain;
  background: ${props => props.background};
  border: 10px solid white;
  width: 100%;
  height: ${({ heightmod }) => heightmod ? (heightmod) * 100 + 'px' : '100px'};
  padding: 8px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
`;

const Info = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 12px;
  color: #343434;
  border-right: 1px solid #CFCFCF;
  display: block;
  width: 84%;

  h1 {
      font-weight: 700;
      margin: 5px 0 8px 0;
  }
  h2{
      font-weight: 400;
      font-size: 12px;
  }
`;

const CapacityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-right: -20px;
`;

const Checkmark = styled(CheckmarkCircleOutline)`
  margin-left: 5px;
`;

const Enter = styled(EnterOutline)`
  margin-left: 5px;
`;

const Capacity = styled.div`
  color: ${props => props.color};
  margin-top: 2px;
  width: 70px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 9px;
`;

const NoCapacity = styled(CloseCircleOutline)`
  margin-left: 7.5px;
`;
