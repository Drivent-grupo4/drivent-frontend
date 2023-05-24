import styled from 'styled-components';

export function ActivitiesItens({ activities, dayId, placeId }) {
  console.log(activities, placeId, dayId);
  return (
    <>
      {activities?.map((a, i) => 
        (a.ActivitiesDays.id === dayId && a.ActivitiesPlace.id === placeId) &&
          <ActivitiesInfo key={i}>
            <Info>
              <h1>{a.name}</h1>
              <h2>{a.startTime.slice(11, 16)} - {a.endTime.slice(11, 16)}</h2>
            </Info>
            <Capacity>{a.capacity}</Capacity>
          </ActivitiesInfo>
      )}
    </>
  );
}

const ActivitiesInfo = styled.div`
justify-content: center;
object-fit: contain;
background-color: #F1F1F1;
border: 10px solid white;
width: 100%;
height: 100px;
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

const Capacity = styled.div`
width: 70px;
`;
