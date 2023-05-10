import styled from 'styled-components';
import Card from '../assets/images/card-image.png';
import { useState } from 'react';
import { useContext } from 'react';
import TicketContext from '../contexts/TicketContext';

export default function PaymentComponent({ enrollment, ticket, getTicket }) {
  const { ticketPrice, withHotel } = useContext(TicketContext);
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState();
  const [cvc, setCvc] = useState('');

  function pay() {
    console.log('finalizar pagamento');
  }

  return (
    <Modality>
      <h2>Ingresso escolhido</h2>
      <nav>
        <div>
          <h3>
            {ticket.TicketType.name} + {withHotel ? 'Com Hotel' : 'Sem Hotel'}
          </h3>
          <p>R$ {ticketPrice}</p>
        </div>
      </nav>

      <h2>Pagamento</h2>
      <CardInfo>
        <img src={Card} alt='' />
        <div>
          <form onSubmit={pay}>
            <Inputs>
              <NormalInputs onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} type='number' placeholder='Card Number' required></NormalInputs>
              <label>E.g.: 49..., 51..., 36..., 37...</label>
              <NormalInputs onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Name' required></NormalInputs>
              <div>
                <ValidInput onChange={(e) => setValidThru(e.target.value)} value={validThru} type='text' placeholder='Valid Thru' required></ValidInput>
                <CvcInput onChange={(e) => setCvc(e.target.value)} value={cvc} type='number' placeholder='CVC' required></CvcInput>
              </div>
              <button><h1>FINALIZAR PAGAMENTO</h1></button>
            </Inputs>
          </form>
        </div>
      </CardInfo>

    </Modality>
  );
}

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
      width: 290px;
      height: 130px;
      border-radius: 20px;
      background-color: #FFEED2;

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
const CardInfo = styled.div`
width: 100%;
display: flex;

img {
  width: 360px;
  height: 230px;
}
`;
const Inputs = styled.div`
width: 303px;
margin: 0 0 0 10px;

label{
  margin: 0 12px;
  color: #8E8E8E;

}
input{
  margin: 10px 10px;
  height: 50px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  padding: 8px;
  ::placeholder{
    font-family: Roboto, sans-serif;
    font-size: 20px;
    padding: 4px;
    color: #8E8E8E;
  }
}

button{
background-color: #e0e0e0;
border: none;
border-radius: 4px;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
width: 182px;
height: 37px;
margin: 20px -360px;
}

div{
  display: flex;
}
`;
const NormalInputs = styled.input`
width: 370px;
`;
const ValidInput = styled.input`
width: 225px;
`;
const CvcInput = styled.input`
width: 125px;
`;
