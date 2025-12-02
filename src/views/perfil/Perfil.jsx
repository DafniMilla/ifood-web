import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  const [dados, setDados] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Carregar dados do restaurante
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function carregarDados() {
      try {
        const resp = await axios.get(
          "http://localhost:8081/restaurante", //verificar se tem essa rota
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setDados(resp.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [token, navigate]);

  // Salvar alterações
  async function salvarAlteracoes(e) {
    e.preventDefault();
    try {
      const resp = await axios.put(
        "http://localhost:8081/restaurante/atualizar", //verificar rota
        dados,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Perfil atualizado com sucesso!");
      setEditando(false);
      setDados(resp.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil");
    }
  }

  // Logout
  function sair() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!dados) return null;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4 border-0">
        <h3 className="fw-bold mb-3 text-danger">Perfil do Restaurante</h3>

        <Form onSubmit={salvarAlteracoes}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Restaurante</Form.Label>
                <Form.Control
                  type="text"
                  value={dados.nome || ""}
                  disabled={!editando}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={dados.email || ""}
                  disabled={!editando}
                  onChange={(e) => setDados({ ...dados, email: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  type="text"
                  value={dados.cnpj || ""}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  value={dados.telefone || ""}
                  disabled={!editando}
                  onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  value={dados.endereco || ""}
                  disabled={!editando}
                  onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Horário de Funcionamento</Form.Label>
                <Form.Control
                  type="text"
                  value={dados.horario || ""}
                  disabled={!editando}
                  onChange={(e) => setDados({ ...dados, horario: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Botões */}
          <div className="d-flex justify-content-between mt-4">
            {!editando ? (
              <Button variant="danger" onClick={() => setEditando(true)}>
                Editar Perfil
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Salvar Alterações
              </Button>
            )}

            <Button variant="outline-danger" onClick={sair}>
              Sair da Conta
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
