import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TelaPrincipal from "./views/TelaPrincipal";
import FormLogin from "./views/login/FormLogin";
import FormCadastroRest from "./views/cadastros/FormCadastroRest";
import FormCadastroDonoRest from "./views/cadastros/FormCadastroDonoRest";
import FormCadastroProduto from "./views/cadastros/FormCadastroProduto";
import EsqueceuSenha from "./views/login/EsqueceuSenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/cadastroRest" element={<FormCadastroRest />} />
        <Route path="/cadastroDonoRest" element={<FormCadastroDonoRest />} />
        <Route path="/cadastroProduto" element={<FormCadastroProduto />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/telaprincipal" element={<TelaPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;
