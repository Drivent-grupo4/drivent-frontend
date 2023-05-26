import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useActivitiesDays from '../../../hooks/api/useActivitiesDays';
import weekday from 'dayjs/plugin/weekday';
import { ActivitiesList } from '../../../components/ActivitiesList';
import useTicket from '../../../hooks/api/useTicket';
import { WarningMessage } from '../../../components/Hotel';

dayjs.extend(weekday);

export default function Activities({ enrollment, getTicket }) {
  const weekdays = {
    0: 'Domingo',
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado',
  };

  const { activitiesDays } = useActivitiesDays();
  const [activities, setActivities] = useState(false);
  const [id, setId] = useState(0);
  const { ticket } = useTicket();
  const [styledSelected, setStyledSelected] = useState(null);

  useEffect(async() => {
    if (activitiesDays) {
      console.log('Days: ', activitiesDays);
    } else {
      console.log('bruh');
    }
  }, [activitiesDays]);

  return (
    <Main>
      <div className="title"> Escolha de Atividades </div>

      {ticket?.status !== 'PAID' && (
        <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</WarningMessage>
      )}

      {ticket?.status === 'PAID' && ticket?.TicketType?.name === 'Online' && (
        <WarningMessage>
          Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
        </WarningMessage>
      )}

      {ticket?.status === 'PAID' && ticket?.TicketType?.name === 'Presencial' && (
        <Modality>
          <h2>Primeiro, filtre pelo dia do evento</h2>
          <nav>
            {activitiesDays?.map(({ date, id }, index) => (
              <DayButton
                type="button"
                index={index}
                styledSelected={styledSelected}
                onClick={() => {
                  setActivities(true);
                  setId(id);
                  setStyledSelected(index);
                  console.log(id);
                }}
              >
                <span>{dayjs(date).format('DD/MM')}</span>
                <span>{weekdays[dayjs(date).weekday()]}</span>
              </DayButton>
            ))}
          </nav>
          {activities && <ActivitiesList id={id} />}
        </Modality>
      )}
    </Main>
  );
};

const Main = styled.main`
  height: 90%;
  .title {
    color: #000000;
    font-size: 32px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    line-height: 45px;
  }
`;

const Modality = styled.aside`
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #8e8e8e;
    padding-bottom: 7px;
  }

  nav {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;

      h3 {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #454545;
      }

      p {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #898989;
        padding-top: 5px;
      }
    }

    div:hover {
      cursor: pointer;
    }
  }
`;

const DayButton = styled.button`
  display: flex;
  border: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  width: 131px;
  height: 37px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background: ${({ styledSelected, index }) => styledSelected === index ? '#FFD37D' : '#E0E0E0'};
`;
