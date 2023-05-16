import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import useHotel from '../hooks/api/useHotel';
import { getRooms } from '../services/roomApi';
import { PersonOutline, Person } from 'react-ionicons';
import HotelPlaceholder from './HotelComponent';
import { getBookings, saveBooking } from '../services/bookingApi';
import { toast } from 'react-toastify';
import useCapacity from '../hooks/api/useCapacity';

export default function Hotel({ ticket }) {
  const token = useToken();
  const { hotels, loadingHotels } = useHotel();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showHosting, setShowHosting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [booking, setBooking] = useState(null);
  const [capacity, setCapacity] = useState(0);

  async function listRooms(id) {
    const bookings = await getBookings(id, token);

    setRooms(bookings);

    return rooms;
  }

  async function sendBooking() {
    const body = {
      roomId: booking,
    };

    try {
      await saveBooking(body, token);
      toast('Quarto reservado com sucesso!');
      window.location.reload(); /*CONSERTAR*/
    } catch (e) {
      toast('Não foi possível realizar a reserva.');
    }
  }

  useEffect(() => {
    listRooms(hotelId);
  }, [hotelId]);

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
                <HotelPlaceholder
                  selectedStyle={selectedStyle}
                  setSelectedStyle={setSelectedStyle}
                  key={index}
                  hotel={hotel}
                  index={hotel.id}
                  hotelId={hotel.id}
                  setShowHosting={setShowHosting}
                  listRooms={listRooms}
                  setHotelId={setHotelId}
                />
              ))}
            </nav>
            {showHosting ?
              <Modality>
                <h2>Ótima pedida! Agora escolha seu quarto:</h2>
                <nav>
                  <MainRooms>
                    {rooms.map((room, index) => (
                      <RoomContainer
                        key={room.id}
                        selectedRoom={selectedRoom === index}
                        background={room._count.Booking === room.capacity ? '#E9E9E9' : '#FFFFFF'}
                        style={room._count.Booking === room.capacity ? { pointerEvents: 'none' } : {}}
                      >
                        <RoomNumber
                          style={room._count.Booking === room.capacity ? { color: '#9D9D9D' } : {}}
                        >
                          {room.name}
                        </RoomNumber>
                        <IconContainer>
                          {[...Array(room.capacity).keys()].map((key) => (
                            selectedIcon === key && selectedRoom === index ?
                              <Person
                                key={key}
                                color={'#FF4791'}
                                title={''}
                                height="27px"
                                width="27px"
                              />
                              :
                              <PersonOutline
                                key={key}
                                color={'#000000'}
                                title={''}
                                height="27px"
                                width="27px"
                                onClick={() => {
                                  setSelectedRoom(index);
                                  setBooking(room.id);
                                  setSelectedIcon(key);
                                  setShowButton(true);
                                }}
                              />
                          ))}
                        </IconContainer>
                      </RoomContainer>
                    ))}
                  </MainRooms>
                </nav>
              </Modality>
              : <></>}
          </Modality>
          {
            showButton &&
            <CloseTicket>
              <button onClick={() => sendBooking()}>RESERVAR QUARTO</button>
            </CloseTicket>
          }
        </Main>
      )}
    </>
  );
}

const CloseTicket = styled.div`
  padding-bottom: 15px;
  padding-top: 23px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;

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

const IconContainer = styled.div`
  margin-top: 9px;
  margin-right: 10px;
`;

const MainRooms = styled.div`
  width: 811px;
  margin-top: 25px;
  display: grid;
  grid-template-columns: 205px 205px 205px 205px;
`;

const RoomContainer = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid;
  border-radius: 10px;
  border-color: #CECECE;
  margin-bottom: 8px;
  background: ${props => props.background};
  display: flex;
  justify-content: space-between;
`;

const RoomNumber = styled.div`
  width: 35px;
  height: 23px;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-top: 11px;
  margin-left: 16px;
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
