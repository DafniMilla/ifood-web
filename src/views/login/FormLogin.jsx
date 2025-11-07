//import axios from 'axios';
import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
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
        <div className="login-page">
      {/* Lado esquerdo com imagem ou cor */}
      <div className="login-banner">
        <Image src= '/ifood-logo-0.png' size="medium" centered />
      </div>

      {/* Lado direito com formulário */}
      <div className="login-column">
        <div className="login-box">
          <Header as="h2" className="login-header">
            Informe suas credenciais de acesso
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
        .login-page {
          display: flex;
          height: 100vh;
          background: #f7f7f7;
        }

        /* Lado esquerdo */
        .login-banner {
          width: 50%;
          background: linear-gradient(135deg, #000000ff, #000000ff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* Lado direito */
        .login-column {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }

        /* Caixa de login */
        .login-box {
          width: 400px;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        /* Título */
        .login-header {
          color: #333;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .login-page {
            flex-direction: column;
          }

          .login-banner,
          .login-column {
            width: 100%;
            height: 50%;
          }

          .login-box {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
}