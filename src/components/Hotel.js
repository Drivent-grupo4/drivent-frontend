import styled from 'styled-components';
import { useEffect } from 'react';
import { getHotels } from '../services/hotelApi';
import useToken from '../hooks/useToken';
import useHotel from '../hooks/api/useHotel';
import { getAccommodationTypes, getAvailability } from './acomodations';

export default function Hotel({ ticket }) {
  const token = useToken();
  const { hotels, loadingHotels } = useHotel();

  // async function listHotels() {
  //   const data = await getHotels(token);

  //   return data;
  // }

  // useEffect(() => {
  //   listHotels();
  // }, []);

  //   return ticket ? (
  //     ticket?.status === 'PAID' ? (
  //       ticket?.TicketType?.includesHotel === false ? (
  //         <WarningMessage>
  //           Sua modalidade de ingresso não inclui hospedagem prossiga para a escolha de atividades
  //         </WarningMessage>
  //       ) : (
  //         <Main>
  //           <div className="title"> Escolha de hotel e quarto </div>
  //           <Modality>
  //             <h2>Primeiro, escolha seu hotel</h2>
  //             <nav>
  //               {hotels?.map((hotel) => {
  //                 <>
  //                   <HotelContainer>
  //                     <HotelThumb src={hotel.image} alt="new" />
  //                     <h4>{hotel.name}</h4>
  //                   </HotelContainer>
  //                 </>;
  //               })}
  //             </nav>
  //           </Modality>
  //         </Main>
  //       )
  //     ) : (
  //       <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningMessage>
  //     )
  //   ) : (
  //     <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningMessage>
  //   );
  // }

  return (
    <>
      {ticket?.status !== 'PAID' && (
        <WarningMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningMessage>
      )}

      {ticket?.status === 'PAID' && !ticket?.TicketType.includesHotel && (
        <WarningMessage>
          Sua modalidade de ingresso não inclui hospedagem prossiga para a escolha de atividades
        </WarningMessage>
      )}

      {ticket?.status === 'PAID' && ticket?.TicketType?.includesHotel && !hotels && !loadingHotels && (
        <WarningMessage>Não foi possivel encontrar hoteis disponiveis</WarningMessage>
      )}

      {ticket?.status === 'PAID' && ticket?.TicketType?.includesHotel && hotels && (
        <Main>
          {' '}
          <div className="title"> Escolha de hotel e quarto </div>
          <Modality>
            <h2>Primeiro, escolha seu hotel</h2>
            <nav>
              {hotels?.map((hotel, index) => (
                <>
                  <HotelContainer key={index}>
                    <HotelThumb src={hotel.image} alt="new" />
                    <h4>{hotel.name}</h4>
                    <h3>Tipo de acomodações:</h3>
                    {/* <p>{getAccommodationTypes(hotel.id)}</p> */}
                    <h3>Vagas disponiveis:</h3>
                    {/* <p>{getAvailability(hotel.id)}</p> */}
                  </HotelContainer>
                </>
              ))}
            </nav>
          </Modality>
        </Main>
      )}
    </>
  );
}
const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background: #ebebeb;
  border-radius: 10px;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    color: #343434;
    margin-left: 15px;
    margin-top: 10px;
  }
  h3 {
    font-size: 13px;
    font-weight: 700px;
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
  color: #8e8e8e;
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
