//import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



export default function FormLogin() {

  //  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {

    if (username !== '' && senha !== '') {

      let authenticationRequest = {
        username: username,
        password: senha,
      }

      // axios.post("http://localhost:8080/api/auth", authenticationRequest)
      //  .then((response) => {

      //   registerSuccessfulLoginForJwt(response.data.token, response.data.tokenExpiresIn
      //)
      //  navigate("/home");

      //})
      //.catch((error) => {

      //      notifyError('Usuário não encontrado')
      // })
    }

  }

  return (
    <div className="container">
      {/* Lado esquerdo com imagem e texto */}
      <div className="left-side">
        <div className="text-content">
          <h1>Venda mais com seu restaurante no iFood</h1>
          <p>Clientes a um clique de distância e seu negócio vendendo como nunca</p>
        </div>
      </div>

      {/* Lado direito com formulário */}
      <div className="login-form">
        <div className="login-box">
          <Header as="h2" className="login-header">
            Login
          </Header>

          <Form>
            <Segment stacked>
              <Form.Input
                fluid
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon="user"
                iconPosition="left"
                placeholder="Informe seu e-mail"
                required
                maxLength="100"
              />

              <Form.Input
                fluid
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="Senha"
                required
                maxLength="100"
              />

              <Button
                fluid
                size="large"
                color="orange"
                icon="sign in alternate"
                content="Entrar"
                onClick={() => entrar()}
              />
            </Segment>
          </Form>
        </div>
      </div>

      {/* ======= CSS  ======= */}
      <style>{`
  .container {
   display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;

  }

  /* LADO ESQUERDO - Imagem e texto */
.left-side {
  flex: 1;
   background: linear-gradient(135deg, #c70909d2, #5f0701ff); 
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.text-content{
color:"#ffffffff",
}
.left-side::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}

  /* Lado direito */
  .login-form {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  }

  /* Caixa de login */
  .login-box {
    width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease-in-out;
  }

  .login-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3);
  }

  /* Cabeçalho */
  .login-header {
    color: #e63946;
    text-align: center;
    margin-bottom: 1.8rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  /* Ajustes de botão */
  .ui.orange.button {
    background-color: #fa0000ee !important;
    color: white !important;
    font-weight: bold;
    border-radius: 10px !important;
    transition: background 0.3s ease;
  }

  .ui.orange.button:hover {
    background-color: #fc4b4bff !important;
  }



  /* ==================== Responsividade ============= */

  @media (max-width: 1024px) {
    .container {
      justify-content: center;
      background-attachment: scroll;
    }

    .login-form {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    .login-box {
      width: 90%;
      padding: 2rem;
      border-radius: 14px;
    }

    .login-header {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .login-box {
      width: 95%;
      padding: 1.8rem;
    }

    .login-header {
      font-size: 1.4rem;
    }
  }
`}</style>
    </div>
  );
}