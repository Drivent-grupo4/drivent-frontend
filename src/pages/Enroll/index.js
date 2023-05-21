import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';
import styled from 'styled-components';
import { LogoGithub } from 'react-ionicons';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignUp from '../../hooks/api/useSignUp';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  const { eventInfo } = useContext(EventInfoContext);

  function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      client_id: '875d47ddd3f152bef0d6',
      redirect_uri: 'http://localhost:3000/sign-in',
      scope: 'user public_repo',
      response_type: 'code',
    };

    const queryString = qs.stringify(params);

    window.location.href = `${GITHUB_URL}?${queryString}`;
  }

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>
          <GitButton color="primary" fullWidth disabled={loadingSignUp} onClick={() => {redirectToGitHub();}}>
            <LogoGithub color="white"/>
            <h1>INCREVA-SE COM GITHUB</h1>
          </GitButton>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
    </AuthLayout>
  );
}

const GitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  background: black;
  border-radius: 5px;
  border: none;
  width: 340px;
  height: 35px;
  margin-top: 8px;
  color: white;
  cursor: pointer;
  h1 {
    margin-left: 10px;
  }
`;
