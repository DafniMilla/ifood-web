import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");

  const token = localStorage.getItem("token");

  async function carregarProdutos() {
    try {
      const response = await axios.get("http://localhost:8081/produtos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Produtos recebidos:", response.data); // debug
      setProdutos(response.data);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar produtos.");
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="fw-bold text-danger mb-3">Cardápio do Restaurante</h2>
      <p className="text-muted">Gerencie os itens que aparecem para seus clientes.</p>
      <hr />

      {erro && <div className="alert alert-danger">{erro}</div>}

      {produtos.length === 0 ? (
        <div className="text-center mt-5" style={{ opacity: 0.7 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="no products"
            width="120"
            className="mb-3"
          />
          <h4 className="fw-bold">Nenhum produto cadastrado</h4>
          <p className="text-muted">Adicione seus primeiros itens no cardápio!</p>
        </div>
      ) : (
        <Row className="mt-4">
          {produtos.map((p) => (
            <Col md={6} lg={4} key={p.idProduto} className="mb-4">
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold mb-1">{p.nome}</h5>
                      <p className="text-muted small mb-2">{p.descricao}</p>

                      <p className="mb-2">
                        <strong>Preço:</strong> R$ {p.preco.toFixed(2)}
                      </p>

                      <Badge bg="secondary" className="me-2">
                        {p.categoria?.nome || "Sem categoria"}
                      </Badge>

                      <Badge bg={p.ativo ? "success" : "danger"}>
                        {p.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    variant="outline-danger"
                    className="w-100 mt-3 rounded-pill"
                    disabled
                  >
                    Editar (em breve)
                  </Button>

                  <Button
                    variant="outline-secondary"
                    className="w-100 mt-2 rounded-pill"
                    disabled
                  >
                    Excluir (em breve)
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
