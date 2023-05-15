import styled from 'styled-components';

export default function HotelConfirmation() {
  return (
    <Main>
      {' '}
      <div className="title"> Escolha de hotel e quarto </div>
      <Modality>
        <h2>Você já escolheu seu quarto:</h2>
        <nav>
          <HotelContainer>
            <HotelThumb src='https://cdn.britannica.com/25/172925-050-DC7E2298/black-cat-back.jpg' alt="new" />
            <h4>Driven Resort</h4>
            <h3>Quarto reservado</h3>
            <p>101 (double)</p>
            <h3>Pessoas no seu quarto</h3>
            <p>Você e mais 1</p>
          </HotelContainer>
        </nav>
      </Modality>
      <CloseTicket>
        <button>TROCAR DE QUARTO</button>
      </CloseTicket>
    </Main>
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
  margin-top: 18px;
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

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  background: #FFEED2;
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
  p {
    margin-left: 15px;
    margin-top: 5px;
    width: 118px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400px;
    font-size: 12px;
    color: #3C3C3C;
  }
`;

const HotelThumb = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  margin-left: 14px;
  margin-top: 16px;
`;
