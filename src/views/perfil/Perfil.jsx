import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";

export default function PerfilRestaurante() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Pegando token salvo no login
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await axios.get(
          "http://localhost:8081/restaurante/perfil",
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        setDados(response.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar dados do perfil");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [token]);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );

  if (erro)
    return (
      <p className="text-center text-danger mt-4">
        {erro}
      </p>
    );

  if (!dados)
    return (
      <p className="text-center mt-4 text-muted">
        Nenhum dado encontrado.
      </p>
    );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">

            <h2 className="text-center mb-4 text-danger">Perfil do Restaurante</h2>

            <h4 className="mt-3">📌 Informações do Restaurante</h4>
            <p><strong>Nome:</strong> {dados.restaurante.nome}</p>
            <p><strong>CNPJ:</strong> {dados.restaurante.cnpj}</p>
            <p><strong>Telefone:</strong> {dados.restaurante.telefone}</p>
            <p><strong>Raio de entrega:</strong> {dados.restaurante.raio_entrega} km</p>

            <hr />

            <h4 className="mt-3">👤 Dono do Restaurante</h4>
            <p><strong>Nome:</strong> {dados.usuario.nome}</p>
            <p><strong>Email:</strong> {dados.usuario.email}</p>
            <p><strong>CPF:</strong> {dados.usuario.cpf}</p>
            <p><strong>Telefone:</strong> {dados.usuario.foneCelular}</p>

            <div className="text-center mt-4">
              <Button variant="danger" size="lg">
                Editar Perfil
              </Button>
            </div>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}
