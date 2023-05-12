import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { getHotels } from '../services/hotelApi';
import useToken from '../hooks/useToken';

export default function Hotel({ ticket }) {
  const token = useToken();
  async function listHotels() {
    const data = await getHotels(token);

    return data;
  }

  useEffect(() => {
    listHotels();
  }, []);

  return (
    ticket ?
      (ticket.status === 'PAID' ?
        (
          (ticket.TicketType.includesHotel === false) ?
            <WarningMessage>
              Sua modalidade de ingresso não inclui hospedagem prossiga para a escolha de atividades
            </WarningMessage>
            :
            <Main>
              <div className="title"> Escolha de hotel e quarto </div>
              <Modality>
                <h2>Primeiro, escolha seu hotel</h2>
                <nav>
                  <HotelContainer>
                    <HotelThumb src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                      alt="new" />
                    <h4>Driven Resort</h4>
                  </HotelContainer>
                </nav>
              </Modality>
            </Main>
        )
        :
        <WarningMessage>
          Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
        </WarningMessage>
      ) :
      <WarningMessage>
        Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
      </WarningMessage>);
};

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background: #EBEBEB;
  border-radius: 10px;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #343434;
    margin-left: 15px;
    margin-top: 10px;
  }
`;

const HotelThumb = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  margin-left: 14px;
  margin-top: 16px;
`;

const WarningMessage = styled.div`
    width: 420px;
    height: 46px;
    font-family: 'Roboto';
    font-size: 20px;
    text-align: center;
    color: #8E8E8E;
    margin-top: 317px;
    margin-left: 256px;
`;

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
