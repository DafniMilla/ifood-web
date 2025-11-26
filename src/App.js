import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TelaPrincipal from "./views/TelaPrincipal";
import FormLogin from "./views/login/FormLogin";
import FormCadastro from "./views/cadastro/FormCadastro";
import EsqueceuSenha from "./views/login/EsqueceuSenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/cadastro" element={<FormCadastro />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/telaprincipal" element={<TelaPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;
