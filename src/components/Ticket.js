import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useToken from '../hooks/useToken';
import { createTicket, getTicketTypes } from '../services/ticketApi';
import HostingSquare from './HostingSquare';
import TicketSquare from './TicketSquare';

export default function Ticket({ enrollment, getTicket }) {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [hotelTypeId, setHotelTypeId] = useState(null);
  const [showHosting, setShowHosting] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
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

  async function createTicketType() {
    try {
      const ticket = await createTicket({ ticketTypeId }, token);

      if (ticket) {
        getTicket();
      }
    } catch (error) {
      alert('Não foi possível reservar seu ingresso!');
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
              ticketTypeId={ ticketTypeId }
              setTicketTypeId={ setTicketTypeId }
              setTicketPrice={ setTicketPrice }
              setShowHosting = { setShowHosting }
              showHosting = { showHosting }
              setShowTotal={ setShowTotal }
              showTotal={ showTotal }
            />
          )) }
        </nav>
      </Modality>
      {
        showHosting &&
        <Modality>
          <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
          <nav>
            { data.map((info, index) => (
              <HostingSquare
                info={ info }
                index={ index }
                hotelTypeId={ hotelTypeId }
                setHotelTypeId={ setHotelTypeId }
                setTicketPrice={ setTicketPrice }
                setShowTotal={ setShowTotal }
                showTotal={ showTotal }
              />
            )) }
          </nav>
        </Modality>
      }
      {
        showTotal &&
        <CloseTicket>
          <p>
            Fechado! O total ficou em <span style={{ fontWeight: 'bold' }}>R$ {ticketPrice.toString()}</span>. Agora é só confirmar:
          </p>
          <button onClick={() => createTicketType()}>RESERVAR INGRESSO</button>
        </CloseTicket>
      }
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

    button {
      display: flex;
      border: none;
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

const CloseTicket = styled.div`
  padding-bottom: 15px;
  padding-top: 23px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;

  p {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: #8e8e8e;
    font-size: 20px;
  }

  button {
    width: 100%;
    height: 35px;
    word-wrap: initial;
    max-width: 150px;
    background-color: #e0e0e0;
    border-radius: 6px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    border: 2px inset transparent;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: #000000;
  }
`;
