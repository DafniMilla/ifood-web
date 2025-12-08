import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function TelaPrincipal() {
  const [pedidos, setPedidos] = useState([]);

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

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
    
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

   
      <main className="flex-grow-1 p-4 bg-light">
        <Container fluid>
          <h2 className="mb-4 fw-bold">Histórico de Pedidos</h2>

          <Row>
            {pedidos.length === 0 && (
              <p>Nenhum pedido encontrado.</p>
            )}

            {pedidos.map((pedido) => (
              <Col md={6} lg={4} className="mb-4" key={pedido.id}>
                <Card className="shadow-sm border-0 rounded-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="mb-0">
                        Pedido #{pedido.id}
                      </Card.Title>
                      <span className="badge bg-secondary text-capitalize px-3 py-2 rounded-pill">
                        {pedido.status?.toLowerCase()}
                      </span>
                    </div>

                    <Card.Text>
                      <strong>Restaurante:</strong> {pedido.restaurante?.nome}
                      <br />
                      <strong>Data:</strong>{" "}
                      {pedido.dataCriacao
                        ? new Date(pedido.dataCriacao).toLocaleString("pt-BR")
                        : "-"}
                      <br />
                      <strong>Total:</strong>{" "}
                      {pedido.valorTotal !== undefined
                        ? `R$ ${pedido.valorTotal.toFixed(2)}`
                        : "-"}
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
