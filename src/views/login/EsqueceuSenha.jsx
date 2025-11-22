import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EsqueceuSenha({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação simples
    if (!email.trim()) {
      setError('Informe seu e-mail');
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido');
      return;
    }

    setLoading(true);

    try {
      const resetRequest = {
        email: email,
      };

      const response = await axios.post(
        '',
        resetRequest
      );

      // Sucesso - exibe mensagem de confirmação
      setSuccess(true);
      console.log('E-mail de recuperação enviado:', response.data);
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Erro ao enviar e-mail de recuperação');
      } else if (err.request) {
        setError('Erro ao conectar com o servidor. Verifique sua conexão.');
      } else {
        setError('Erro ao processar solicitação. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="forgot-password-container">
      <Row className="h-100">
        {/* Lado Esquerdo - Estilo Visual */}
        <Col md={6} className="left-panel d-none d-md-flex">
          <div className="left-content">
            <div className="logo-section">
              <h1 className="logo-text">iFood</h1>
            </div>
            <div className="content-section">
              <h2 className="title">Recupere sua senha</h2>
              <p className="subtitle">
                Não se preocupe! Vamos te ajudar a recuperar o acesso à sua conta
              </p>
              <div className="features">
                <div className="feature-item">
                  <span className="feature-icon">🔐</span>
                  <span>Recuperação segura</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📧</span>
                  <span>E-mail de recuperação</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Processo rápido e fácil</span>
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* Lado Direito - Formulário */}
        <Col md={6} className="right-panel d-flex align-items-center justify-content-center">
          <Card className="forgot-password-card">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="forgot-password-title">Esqueceu sua senha?</h2>
                <p className="forgot-password-subtitle">
                  {success 
                    ? 'Verifique sua caixa de entrada' 
                    : 'Digite seu e-mail e enviaremos um link para redefinir sua senha'}
                </p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success ? (
                <div className="success-message">
                  <div className="alert alert-success" role="alert">
                    <div className="success-icon">✓</div>
                    <div>
                      <strong>E-mail enviado com sucesso!</strong>
                      <p className="mb-0 mt-2">
                        Enviamos um link de recuperação para <strong>{email}</strong>.
                        Verifique sua caixa de entrada e siga as instruções.
                      </p>
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setSuccess(false);
                        setEmail('');
                      }}
                    >
                      Enviar novamente
                    </Button>
                  </div>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Informe seu e-mail cadastrado"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={100}
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      variant="danger"
                      size="lg"
                      className="forgot-password-button"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                    </Button>
                  </div>
                </Form>
              )}

              <div className="divider my-4">
                <span>ou</span>
              </div>

              <div className="text-center">
                <p className="back-login-text">
                  Lembrou sua senha?{' '}
                  <a 
                    href="#" 
                    className="back-login-link" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = '';
                      if (onBackToLogin) onBackToLogin();
                    }}
                  >
                    Voltar para o login
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS Styles */}
      <style>{`
        .forgot-password-container {
          height: 100vh;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        .forgot-password-container .row {
          margin: 0;
        }

        /* Lado Esquerdo - Estilo Visual */
        .left-panel {
          background: linear-gradient(135deg, #ea1d2c 0%, #c70909 100%);
          position: relative;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          opacity: 0.3;
        }

        .left-content {
          position: relative;
          z-index: 1;
          padding: 3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
        }

        .logo-section {
          margin-bottom: 3rem;
        }

        .logo-text {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .content-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          color: white;
        }

        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          opacity: 0.95;
          line-height: 1.6;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 1.8rem;
        }

        /* Lado Direito - Formulário */
        .right-panel {
          background: #f8f9fa;
          padding: 2rem;
        }

        .forgot-password-card {
          width: 100%;
          max-width: 450px;
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          background: white;
        }

        .forgot-password-title {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .forgot-password-subtitle {
          color: #6c757d;
          font-size: 0.95rem;
          margin: 0;
        }

        .form-control-custom {
          border-radius: 8px;
          border: 1px solid #dee2e6;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control-custom:focus {
          border-color: #ea1d2c;
          box-shadow: 0 0 0 0.2rem rgba(234, 29, 44, 0.25);
        }

        .forgot-password-button {
          background-color: #ea1d2c;
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .forgot-password-button:hover {
          background-color: #c70909;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(234, 29, 44, 0.4);
        }

        .forgot-password-button:disabled {
          background-color: #ea1d2c;
          opacity: 0.7;
          transform: none;
        }

        .success-message .alert-success {
          border-radius: 8px;
          border: none;
          background-color: #d4edda;
          color: #155724;
          padding: 1.5rem;
        }

        .success-icon {
          font-size: 2rem;
          color: #28a745;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .divider {
          position: relative;
          text-align: center;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: #dee2e6;
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .back-login-text {
          color: #6c757d;
          font-size: 0.95rem;
          margin: 0;
        }

        .back-login-link {
          color: #ea1d2c;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .back-login-link:hover {
          color: #c70909;
          text-decoration: underline;
        }

        .alert {
          border-radius: 8px;
          border: none;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .left-panel {
            display: none !important;
          }

          .right-panel {
            padding: 1rem;
          }

          .forgot-password-card {
            max-width: 100%;
          }

          .title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .forgot-password-title {
            font-size: 1.75rem;
          }

          .logo-text {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </Container>
  );
}
