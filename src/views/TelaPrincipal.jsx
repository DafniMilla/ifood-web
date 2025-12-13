import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

export default function TelaPrincipal() {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8081/pedidos/historico/restaurante", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const dados = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setPedidos(dados);
      })
      .catch((error) => {
        console.log("Erro ao carregar pedidos:", error);
      });
  }, []);

  const abrirDetalhes = (pedido) => {
    setPedidoSelecionado(pedido);
    setShowModal(true);
  };

  const fecharDetalhes = () => {
    setShowModal(false);
    setPedidoSelecionado(null);
  };

  const quantidadeTotal = (itens = []) =>
    itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <Container fluid>
      <h2 className="mb-4 fw-bold">Histórico de Pedidos</h2>

      <Row>
        {pedidos.length === 0 && <p>Nenhum pedido encontrado.</p>}

        {pedidos.map((pedido) => (
          <Col md={6} lg={4} className="mb-4" key={pedido.id}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                <Card.Title>Pedido #{pedido.id}</Card.Title>

                <Card.Text>
                  <strong>Produto:</strong>{" "}
                  {pedido.itens?.[0]?.produto?.nome || "-"}
                  <br />

                  <strong>Quantidade:</strong>{" "}
                  {quantidadeTotal(pedido.itens)}
                  <br />

                  <strong>Total:</strong>{" "}
                  {pedido.valorTotal !== undefined
                    ? `R$ ${pedido.valorTotal.toFixed(2)}`
                    : "-"}
                </Card.Text>

                <Button
                  variant="danger"
                  className="w-100 rounded-pill"
                  onClick={() => abrirDetalhes(pedido)}
                >
                  Ver detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL DE DETALHES */}
<Modal show={showModal} onHide={fecharDetalhes} size="lg" centered>
  <Modal.Header
    closeButton
    className="bg-danger text-white rounded-top"
  >
    <Modal.Title className="fw-bold">
      Detalhes do Pedido #{pedidoSelecionado?.id}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="bg-light">
    {pedidoSelecionado?.itens?.map((item, index) => (
      <Card
        key={index}
        className="mb-3 border-0 shadow-sm rounded-4"
      >
        <Card.Body>
          <Row>
            <Col md={8}>
              <h5 className="fw-bold mb-2">
                {item.produto?.nome}
              </h5>

              <p className="text-muted mb-1">
                {item.produto?.descricao}
              </p>

              <p className="mb-1">
                <strong>Categoria:</strong>{" "}
                {item.produto?.categoria?.nome}
              </p>

              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    item.produto?.ativo
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                  }
                >
                  {item.produto?.ativo ? "Ativo" : "Inativo"}
                </span>
              </p>
            </Col>

            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <p className="mb-1">
                <strong>Preço:</strong>
                <br />
                R$ {item.produto?.preco?.toFixed(2)}
              </p>

              <p className="mb-1">
                <strong>Qtd:</strong> {item.quantidade}
              </p>

              <p className="fw-bold text-danger">
                Subtotal:
                <br />
                R$ {item.subtotal?.toFixed(2)}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))}

    <hr />

    <div className="d-flex justify-content-end">
      <h4 className="fw-bold">
        Total do pedido:{" "}
        <span className="text-danger">
          R$ {pedidoSelecionado?.valorTotal?.toFixed(2)}
        </span>
      </h4>
    </div>
  </Modal.Body>

  <Modal.Footer className="bg-light">
    <Button
      variant="secondary"
      className="rounded-pill px-4"
      onClick={fecharDetalhes}
    >
      Fechar
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
}
