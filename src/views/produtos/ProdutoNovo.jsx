import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export default function ProdutoNovo() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const token = localStorage.getItem("token");

  // ------------------------------------------
  // CADASTRAR PRODUTO
  // ------------------------------------------
  async function cadastrarProduto(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !descricao || !preco || !categoria) {
      return setErro("Preencha todos os campos!");
    }

    try {
      const payload = {
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,  // categoria digitada livremente
        ativo,
      };

      await axios.post("http://localhost:8081/produto", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSucesso("Produto cadastrado com sucesso!");

      // limpa o form
      setNome("");
      setDescricao("");
      setPreco("");
      setCategoria("");
      setAtivo(true);

    } catch (e) {
      console.error(e);
      setErro(e.response?.data?.message || "Erro ao cadastrar produto.");
    }
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <h2 className="fw-bold text-danger">Cadastrar Novo Produto</h2>
          <p className="text-muted">Adicione um novo item ao seu cardápio.</p>
          <hr />
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm">
            {erro && <div className="alert alert-danger">{erro}</div>}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}

            <Form onSubmit={cadastrarProduto}>

              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Lanche, Bebida, Sobremesa..."
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={ativo}
                  onChange={(e) => setAtivo(e.target.value === "true")}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Desativado</option>
                </Form.Select>
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100">
                Salvar Produto
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
