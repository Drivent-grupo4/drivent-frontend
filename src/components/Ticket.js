import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import { getTicketTypes } from '../services/ticketApi';
import TicketSquare from './TicketSquare';

export default function Ticket({ enrollment, getTicket }) {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState({});
  const [data, setData] = useState();
  const token = useToken();

  async function getTicketType() {
    try {
      const ticketType = await getTicketTypes(token);

      console.log('type', ticketType);

      setData(ticketType);
    } catch (error) {
      alert('Desculpe, houve um erro!');
    }
  }

  useEffect(() => {
    getTicketType();
  }, []);

  if (data === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <Main>
      <div className="title"> Ingresso e pagamento </div>
      <Modality>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
        <nav>
          { data.map((info, index) => (
            <TicketSquare
              info={ info }
              index={ index }
              setTicketTypeId={ setTicketTypeId }
              setTicketPrice={ setTicketPrice }
            />
          )) }
        </nav>
      </Modality>
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

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
      width: 130px;
      height: 130px;
      border-radius: 20px;
      box-shadow: inset 0px 0px 0px 1px #cecece;

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
