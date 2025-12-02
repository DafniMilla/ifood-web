import { useState } from "react";
import axios from "axios";

export default function FormCadastroDonoRest({ onBackToLogin }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar() {
    if (!nome || !cpf || !email || !password || !fone || !dtNascimento)
      return setErro("Preencha todos os campos");

    if (!email.includes("@")) return setErro("O e-mail deve conter @");
    if (cpf.length !== 11) return setErro("CPF deve ter 11 dígitos");
    if (password.length < 6) return setErro("Senha deve ter no mínimo 6 caracteres");
    if (password !== repPassword) return setErro("As senhas dever ser iguais!");

    setErro("");

    const payload = {
      nome,
      cpf,
      email,
      password,
      foneCelular: fone,
      dtNascimento,
    };

    try {
      const res = await axios.post(
        "http://localhost:8081/auth/registro",
        payload
      );

      const id_usuario = res.data.idUsuario;

      // Envia o id para o FormCadastroRest
      if (onBackToLogin) onBackToLogin("cadastroRest", id_usuario);

    } catch (e) {
      console.log(e);
      setErro("Erro ao cadastrar dono");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Cadastro do Dono</h1>

      {erro && <p style={styles.erro}>{erro}</p>}

      <div style={styles.group}>
        <label style={styles.label}>Nome completo</label>
        <input style={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>CPF</label>
        <input style={styles.input} maxLength={11} value={cpf} onChange={(e) => setCpf(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>E-mail</label>
        <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Telefone</label>
        <input style={styles.input} value={fone} onChange={(e) => setFone(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Data de nascimento</label>
        <input style={styles.input} type="date" value={dtNascimento} onChange={(e) => setDtNascimento(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Senha</label>
        <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Repetir senha</label>
        <input style={styles.input} type="password" value={repPassword} onChange={(e) => setRepPassword(e.target.value)} />
      </div>

      <button style={styles.btn} onClick={cadastrar}>
        Próximo →
      </button>

      <button
        style={styles.voltar}
        onClick={(e) => {
          e.preventDefault();
          if (onBackToLogin) onBackToLogin("login");
        }}>
        ← Voltar ao login
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 450,
    margin: "60px auto",
    backgroundColor: "#fff",
    padding: 35,
    borderRadius: 16,
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  },
  titulo: {
    textAlign: "center",
    color: "#ea1d2c",
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 25,
  },
  group: { marginBottom: 16 },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  btn: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ea1d2c",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 18,
    cursor: "pointer",
    transition: "0.3s",
  },
  voltar: {
    width: "100%",
    marginTop: 15,
    padding: 12,
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    color: "#555",
    textDecoration: "underline",
  },
  erro: {
    backgroundColor: "#ffe5e5",
    padding: 12,
    borderRadius: 10,
    color: "#b30000",
    textAlign: "center",
    marginBottom: 15,
  },
};
