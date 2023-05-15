import styled from 'styled-components';
import OK from '../assets/images/confirmed.png';

export function PaymentConfirmation() {
  return (
    <ConfirmationBox>
      <img src={OK} alt='confirmation' />
      <div>
        <h1>Pagamento confirmado!</h1>
        <h2>Prossiga para escolha de hospedagem e atividades</h2>
      </div>
    </ConfirmationBox>
  );
}

const ConfirmationBox = styled.div`
display: flex;
img{
    width: 50px;
    height: 50px;
}
div{
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #454545;
    h1{
        margin: 8px 0 5px 8px;
    }
    h2{
        margin: 0 8px;
        font-size: 16px;
    }
}
`;
