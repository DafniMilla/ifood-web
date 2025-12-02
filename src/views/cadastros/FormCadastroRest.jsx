import { useState } from "react";
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
  const [erro, setErro] = useState("");

  async function cadastrar() {
    if (!nome || !telefone || !cnpj || !raio)
      return setErro("Preencha todos os campos");

    try {
      await axios.post("http://localhost:8081/restaurante", {
        nome,
        telefone,
        cnpj,
        raio_entrega: raio,
        id_usuario,
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
        <input style={styles.input} maxLength={14} value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

        <label style={styles.label}>Raio de Entrega (km)</label>
        <input style={styles.input} value={raio} onChange={(e) => setRaio(e.target.value)} />

        <button
          style={styles.btn}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          onClick={cadastrar}
        >
          Concluir cadastro
        </button>

        <p style={styles.voltar}>
          <span onClick={() => navigate("/login")} style={styles.voltarLink}>
            ← Voltar para o login
          </span>
        </p>

      </div>

      <style>{`
        button {
          transition: all 0.3s ease;
        }
      `}</style>
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
  voltar: {
    textAlign: "center",
    marginTop: 18,
  },
  voltarLink: {
    color: "#ea1d2c",
    fontWeight: "600",
    fontSize: 15,
    cursor: "pointer",
    textDecoration: "none",
  },
};
