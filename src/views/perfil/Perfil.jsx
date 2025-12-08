import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";

export default function PerfilRestaurante() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await axios.get(
          "http://localhost:8081/restaurante",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setDados(response.data);
      } catch (err) {
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

  if (erro) return <p className="text-center text-danger mt-4">{erro}</p>;
  if (!dados.length) return <p className="text-center mt-4">Nenhum dado encontrado.</p>;

  const restaurante = dados[0];

  const imagemUrl = `http://localhost:8081${restaurante.urlImagem}`;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">

            <h2 className="text-center mb-4 text-danger">Perfil do Restaurante</h2>

            {/* IMAGEM CENTRALIZADA */}
            <div className="text-center mb-4">
              <img
                src={imagemUrl}
                alt="Imagem do Restaurante"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "3px solid #dc3545",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              />
            </div>

            <h4>📌 Informações do Restaurante</h4>
            <p><strong>Nome:</strong> {restaurante.nome}</p>
            <p><strong>CNPJ:</strong> {restaurante.cnpj}</p>
            <p><strong>Telefone:</strong> {restaurante.telefone}</p>
            <p><strong>Raio de entrega:</strong> {restaurante.raio_entrega} km</p>

            <hr />

            <h4>👤 Dono do Restaurante</h4>
            <p><strong>Nome:</strong> {restaurante.usuario.nome}</p>
            <p><strong>Email:</strong> {restaurante.usuario.email}</p>
            <p><strong>CPF:</strong> {restaurante.usuario.cpf}</p>
            <p><strong>Telefone:</strong> {restaurante.usuario.foneCelular}</p>

            <div className="text-center mt-4">
              <Button variant="danger" size="lg">Editar Perfil</Button>
            </div>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}
