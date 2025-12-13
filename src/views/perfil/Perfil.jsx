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
        const response = await axios.get("http://localhost:8081/restaurante", {
          headers: { Authorization: `Bearer ${token}` }
        });

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
          <Card className="shadow-lg p-4 rounded-4 border-0">

            {/* Título Central */}
            <h2 className="text-center mb-4 fw-bold" style={{ color: "#b30000" }}>
               Perfil do Restaurante
            </h2>

            {/* Imagem */}
            <div className="text-center mb-4">
              <img
                src={imagemUrl}
                alt="Imagem do Restaurante"
                style={{
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #dc3545",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.25)"
                }}
              />
            </div>

            {/* Informações */}
            <Card className="p-3 mb-4 shadow-sm border-0 rounded-3">
              <h4 className="mb-3" style={{ color: "#dc3545" }}> Informações do Restaurante</h4>
              <p><strong>Nome:</strong> {restaurante.nome}</p>
              <p><strong>CNPJ:</strong> {restaurante.cnpj}</p>
              <p><strong>Telefone:</strong> {restaurante.telefone}</p>
              <p><strong>Raio de entrega:</strong> {restaurante.raio_entrega} km</p>
            </Card>

            {/* Dono */}
            <Card className="p-3 mb-3 shadow-sm border-0 rounded-3">
              <h4 className="mb-3" style={{ color: "#dc3545" }}> Dono do Restaurante</h4>
              <p><strong>Nome:</strong> {restaurante.usuario.nome}</p>
              <p><strong>Email:</strong> {restaurante.usuario.email}</p>
              <p><strong>CPF:</strong> {restaurante.usuario.cpf}</p>
              <p><strong>Telefone:</strong> {restaurante.usuario.foneCelular}</p>
            </Card>

            {/* Botão */}
            <div className="text-center mt-4">
              <Button variant="danger" size="lg" className="px-4 rounded-pill shadow-sm">
                Editar Perfil
              </Button>
            </div>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}
