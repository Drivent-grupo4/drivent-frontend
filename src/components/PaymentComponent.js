import styled from 'styled-components';
import { useContext } from 'react';
import TicketContext from '../contexts/TicketContext';
import { postPayment } from '../services/paymentApi';
import useToken from '../hooks/useToken';
import { PaymentConfirmation } from './PaymentConfirmation';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function PaymentComponent({ ticket }) {
  const { ticketPrice, withHotel } = useContext(TicketContext);
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [cvv, setCvv] = useState('');
  const [payed, setPayed] = useState(false);
  const [focus, setFocus] = useState('');
  const token = useToken();
  
  useEffect(() => {
    setPayed(ticket.status === 'PAID');
  }, []);

  async function pay(e) {
    e.preventDefault();

    let issuer;
    const visaRegex = /^4/;
    const mastercardRegex = /^5[1-5]/;
    const amexRegex = /^3[47]/;
    const discoverRegex = /^(6011|65|64[4-9])/;

    if (visaRegex.test(cardNumber)) issuer = 'Visa';
    if (mastercardRegex.test(cardNumber)) issuer = 'Mastercard';
    if (amexRegex.test(cardNumber)) issuer = 'American Express';
    if (discoverRegex.test(cardNumber)) issuer = 'Discover';

    const month = validThru[0]+validThru[1];
    const year = validThru[2]+validThru[3];
    const adjustedYear = `20${year}`;
    const expirationDate = new Date(adjustedYear, month, 1);

    const body = {
      ticketId: ticket.id,
      cardData: {
        issuer,
        number: Number(cardNumber),
        name,
        expirationDate,
        cvv
      }
    };
    
    try {
      await postPayment(token, body);
      setPayed(true);
      toast ('Pagamento feito com sucesso!');
    } catch (e) {
      toast ('Não foi possível realizar o pagamento.');
    }
  }

  function handleInputFocus(e) {
    setFocus(e.target.name);
  }

  return (
    <Main>
      <h4> Ingresso e pagamento </h4>
      <Modality>
        <h2>Ingresso escolhido</h2>
        <nav>
          <div>
            <h3>
              {ticket.TicketType.name} + {withHotel || ticket.TicketType.includesHotel ? 'Com Hotel' : 'Sem Hotel'}
            </h3>
            <p>R$ {ticketPrice === 0 ? ticket.TicketType.price : ticketPrice}</p>
          </div>
        </nav>

        <h2>Pagamento</h2>
        {!payed && <CardInfo>
          
          <Cards
            number={cardNumber}
            expiry={validThru}
            cvc={cvv}
            name={name}
            focused={focus}
          />
          <div>
            <form onSubmit={pay}>
              <Inputs>

                <NormalInputs 
                  onChange={(e) => setCardNumber(Number(e.target.value))} 
                  name='number' 
                  onFocus={handleInputFocus} 
                  value={cardNumber} 
                  type='text' 
                  placeholder='Card Number' 
                  maxLength={16} 
                  pattern='\d*' 
                  inputMode='numeric' 
                  required>
                </NormalInputs>
                <label>E.g.: 49..., 51..., 36..., 37...</label>
                <NormalInputs 
                  onChange={(e) => setName(e.target.value)} 
                  name='name' 
                  onFocus={handleInputFocus} 
                  value={name} 
                  type='text' 
                  placeholder='Name' 
                  required>
                </NormalInputs>

                <div>

                  <ValidInput 
                    onChange={(e) => setValidThru(e.target.value)} 
                    name='expiry' 
                    onFocus={handleInputFocus} 
                    value={validThru} 
                    type='text' 
                    placeholder='Valid Thru' 
                    maxLength={4} 
                    pattern='\d*' 
                    inputMode='numeric' 
                    required>
                  </ValidInput>
                  <CvvInput 
                    onChange={(e) => setCvv(Number(e.target.value))} 
                    name='cvc' 
                    onFocus={handleInputFocus} 
                    value={cvv} 
                    type='text' 
                    placeholder='CVC' 
                    maxLength={3} 
                    pattern='\d*' 
                    inputMode='numeric' 
                    required>
                  </CvvInput>

                </div>
                <button type='submit'><h1>FINALIZAR PAGAMENTO</h1></button>
              </Inputs>
            </form>
          </div>
        </CardInfo>}

        {payed && <PaymentConfirmation />}

      </Modality>
    </Main>
  );
}

const Main = styled.main`
  height: 90%;
  h4 {
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
height: 200px;
display: flex;

div{
  margin: 0 0 0 0;
  box-sizing: border-box;
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
  margin: 0 10px 10px 10px;
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
margin: 20px -290px;
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
const CvvInput = styled.input`
width: 125px;
`;
