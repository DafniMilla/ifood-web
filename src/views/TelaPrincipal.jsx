import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function TelaPrincipal() {
  const historicoPedidos = [
    {
      id_pedido: 101,
      restaurante: "Pizza Show",
      data_pedido: "20/11/2025 19:30",
      valor_total: "R$ 58,90",
      status: "entregue",
    },
    {
      id_pedido: 102,
      restaurante: "Burger Mania",
      data_pedido: "22/11/2025 21:10",
      valor_total: "R$ 32,00",
      status: "a caminho",
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* MENU */}
      <aside
        className="text-white p-4 d-flex flex-column"
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #ea1d2c, #b91521)",
        }}
      >
        <h3 className="fw-bold text-center mb-5">iFood 2.0</h3>

        <NavLink
          to="/pedidos"
          className={({ isActive }) =>
            `menu-link mb-3 ${isActive ? "menu-active" : ""}`
          }
        >
          Meus Pedidos
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `menu-link mb-3 ${isActive ? "menu-active" : ""}`
          }
        >
          Perfil do Restaurante
        </NavLink>

       <NavLink
  to="/produtos/novo"
  className={({ isActive }) =>
    `menu-link mb-3 ${isActive ? "menu-active" : ""}`
  }
>
  Cadastrar Produtos
</NavLink>

<NavLink
  to="/produtos/cardapio"
  className={({ isActive }) =>
    `menu-link mb-3 ${isActive ? "menu-active" : ""}`
  }
>
  Cardápio
</NavLink>

      </aside>

      {/* CONTEÚDO PADRÃO DA TELA PRINCIPAL */}
      <main className="flex-grow-1 p-4 bg-light">
        <Container fluid>
          <h2 className="mb-4 fw-bold">Histórico de Pedidos</h2>

          <Row>
            {historicoPedidos.map((pedido) => (
              <Col md={6} lg={4} key={pedido.id_pedido} className="mb-4">
                <Card className="shadow-sm border-0 rounded-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="mb-0">
                        Pedido #{pedido.id_pedido}
                      </Card.Title>
                      <span className="badge bg-secondary text-capitalize px-3 py-2 rounded-pill">
                        {pedido.status}
                      </span>
                    </div>

                    <Card.Text>
                      <strong>Restaurante:</strong> {pedido.restaurante}
                      <br />
                      <strong>Data:</strong> {pedido.data_pedido}
                      <br />
                      <strong>Total:</strong> {pedido.valor_total}
                    </Card.Text>

                    <Button variant="danger" className="w-100 rounded-pill">
                      Ver detalhes
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      {/* ESTILOS */}
      <style>{`
        .menu-link {
          text-decoration: none;
          cursor: pointer;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.15);
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .menu-link:hover {
          background: rgba(255,255,255,0.3);
          transform: translateX(5px);
        }

        .menu-active {
          background: white;
          color: #ea1d2c;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
