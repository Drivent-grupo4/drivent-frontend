import styled from 'styled-components';
import { EnterOutline, CloseCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import useActivityCapacity from '../hooks/api/useActivityCapacity';
import { useEffect } from 'react';
import { bookActivity, getUserActivities } from '../services/activitiesDaysApi';

function getCapacity(id, capacity) {
  const { bookings } = useActivityCapacity(id);

  let total = 0;
  let occupancy = 0;
  if (bookings) {
    let bookingList = [...bookings];
    total += capacity;
    occupancy += bookingList.length;
  }
  return total - occupancy;
}

export default function Activity({ index, id, name, startTime, endTime, capacity, selectedActivity, setSelectedActivity, setColor, color, token }) {
  function handleTime(startTime, endTime) {
    const hoursDif = Number(endTime.slice(11, 13)) - Number(startTime.slice(11, 13));
    const minDif = Math.abs(Number(endTime.slice(14, 16)) - Number(startTime.slice(14, 16))) / 60;

    const res = hoursDif + minDif;

    return res;
  }

  let activityCapacity = 0;

  if (id) {
    activityCapacity = getCapacity(id, capacity);
  }

  async function getUserRegisteredActivities() {
    const bookings = await getUserActivities(token);
    let bookingId = [];
    if (bookings) {
      for (let item of bookings) {
        bookingId.push(item.activitiesId);
      }
      setSelectedActivity([...bookingId]);
    }
  }

  useEffect(() => {
    getUserRegisteredActivities(token);
  }, [token]);

  async function bookUserActivity(activitiesId) {
    try {
      await bookActivity(activitiesId, token);
      setSelectedActivity([...selectedActivity, activitiesId]);
      toast('Inscrito na atividade com sucesso!');
      getUserRegisteredActivities();
    } catch (e) {
      toast('Não foi possível se inscrever.');
    }
  }

  return (
    <ActivitiesInfo
      onClick={() => bookUserActivity(id)}
      background={selectedActivity.includes(id) ? '#D0FFDB' : '#F1F1F1'}
      key={index + id}
      heightmod={handleTime(startTime, endTime)}
    >
      <Info>
        <h1>{name}</h1>
        <h2>{startTime.slice(11, 16)} - {endTime.slice(11, 16)}</h2>
      </Info>
      {selectedActivity.includes(id) ?
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
        (activityCapacity === 0 ?
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
            <Capacity color={'green'}>{activityCapacity} vagas</Capacity>
          </CapacityContainer>
        )}
    </ActivitiesInfo>
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
