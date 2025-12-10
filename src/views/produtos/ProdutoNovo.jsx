import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

  const styles = {
  label: {
    marginBottom: 6,
    display: "block",
  },
    input: {
    width: "100%",
    padding: 13,
    marginBottom: 15,
    border: "1px solid #dee2e6",
    borderRadius: 10,
    fontSize: 15,
    transition: "0.3s",
  },

  }



export default function ProdutoNovo() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [imagem, setImagem] = useState(null);
  

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

  // validações
  if (!nome || !descricao || !preco || !categoria)
    return setErro("Preencha todos os campos!");

  if (!imagem)
    return setErro("Envie uma imagem do produto!");

  try {
    const dados = {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      ativo,
    };

    const formData = new FormData();
    formData.append("dados", new Blob([JSON.stringify(dados)], { type: "application/json" }));
    formData.append("imagem", imagem);

    const token = localStorage.getItem("token");

    await axios.post("http://localhost:8081/produtos/criar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setSucesso("Produto cadastrado com sucesso!");

    // limpa os campos
    setNome("");
    setDescricao("");
    setPreco("");
    setCategoria("");
    setAtivo(true);
    setImagem(null);

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

              <label style={styles.label}>Imagem do produto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
                style={styles.input}
              />

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
