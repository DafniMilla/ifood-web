import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormCadastroRest() {
  const location = useLocation();
  const navigate = useNavigate();
  const id_usuario = location.state?.id_usuario;

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [raio, setRaio] = useState("");

  // endereço
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  // categorias
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");

  // imagem
  const [imagem, setImagem] = useState(null);

  const [erro, setErro] = useState("");

  // pega as catergorias 
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await axios.get("http://localhost:8081/categorias/restaurantes");
        setCategorias(resposta.data);
      } catch (e) {
        console.log("Erro ao carregar categorias", e);
      }
    }
    carregarCategorias();
  }, []);

  async function cadastrar() {
    if (!nome || !telefone || !cnpj || !raio || !categoriaId || !rua || !numero || !bairro || !cidade || !estado || !cep)
      return setErro("Preencha todos os campos obrigatórios");

    if (!imagem)
      return setErro("Envie uma imagem do restaurante!");

    try {
      // montar objeto de dados igual ao RestauranteRequest
      const dados = {
        nome,
        telefone,
        cnpj,
        raio_entrega: raio,
        categoriaId,
        idUsuario: id_usuario,
        endereco: {
          rua,
          numero,
          bairro,
          cidade,
          estado,
          cep,
        }
      };

      const formData = new FormData();
      formData.append("dados", new Blob([JSON.stringify(dados)], { type: "application/json" }));
      formData.append("imagem", imagem);
       const token = localStorage.getItem("token")
    await axios.post("http://localhost:8081/restaurante", formData, {
    headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
  }
});

      navigate("/telaprincipal");
      
    } catch (e) {
      console.log(e);
      setErro("Erro ao cadastrar restaurante");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.titulo}>Cadastro do Restaurante</h1>

        {erro && <p style={styles.erro}>{erro}</p>}

        <label style={styles.label}>Nome do Restaurante</label>
        <input style={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />

        <label style={styles.label}>Telefone</label>
        <input style={styles.input} value={telefone} onChange={(e) => setTelefone(e.target.value)} />

        <label style={styles.label}>CNPJ</label>
        <input style={styles.input} maxLength={18} value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

        <label style={styles.label}>Raio de Entrega (km)</label>
        <input style={styles.input} value={raio} onChange={(e) => setRaio(e.target.value)} />

        {/* Seleção de categoria */}
        <label style={styles.label}>Categoria</label>
        <select style={styles.input} value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
          <option value="">Selecione...</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>

        {/*  Endereço */}
        <h3 style={{ marginTop: 20 }}>Endereço</h3>

        <label style={styles.label}>Rua</label>
        <input style={styles.input} value={rua} onChange={(e) => setRua(e.target.value)} />

        <label style={styles.label}>Número</label>
        <input style={styles.input} value={numero} onChange={(e) => setNumero(e.target.value)} />

        <label style={styles.label}>Bairro</label>
        <input style={styles.input} value={bairro} onChange={(e) => setBairro(e.target.value)} />

        <label style={styles.label}>Cidade</label>
        <input style={styles.input} value={cidade} onChange={(e) => setCidade(e.target.value)} />

        <label style={styles.label}>Estado</label>
        <input style={styles.input} value={estado} onChange={(e) => setEstado(e.target.value)} />

        <label style={styles.label}>CEP</label>
        <input style={styles.input} value={cep} onChange={(e) => setCep(e.target.value)} />

        {/*  Upload da imagem */}
        <label style={styles.label}>Imagem do Restaurante</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          style={styles.input}
        />

        <button style={styles.btn} onClick={cadastrar}>
          Concluir cadastro
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  container: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
  },
  titulo: {
    textAlign: "center",
    color: "#ea1d2c",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
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
  btn: {
    width: "100%",
    backgroundColor: "#ea1d2c",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(234,29,44,0.3)",
  },
  erro: {
    backgroundColor: "#ffe5e5",
    padding: 12,
    borderRadius: 10,
    color: "#b70000",
    marginBottom: 15,
    textAlign: "center",
  },
};
