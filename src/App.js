import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TelaPrincipal from "./views/TelaPrincipal";
import FormLogin from "./views/login/FormLogin";
import FormCadastroRest from "./views/cadastros/FormCadastroRest";
import FormCadastroDonoRest from "./views/cadastros/FormCadastroDonoRest";
import EsqueceuSenha from "./views/login/EsqueceuSenha";

import Pedidos from "./views/pedidos/Pedidos";
import Perfil from "./views/perfil/Perfil";

import ProdutoNovo from "./views/produtos/ProdutoNovo";
import Cardapio from "./views/produtos/Cardapio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/cadastroRest" element={<FormCadastroRest />} />
        <Route path="/cadastroDonoRest" element={<FormCadastroDonoRest />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />

        {/* painel principal */}
        <Route path="/telaprincipal" element={<TelaPrincipal />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* produtos */}
        <Route path="/produtos/novo" element={<ProdutoNovo />} />
        <Route path="/produtos/cardapio" element={<Cardapio />} />
      </Routes>
    </Router>
  );
}

export default App;
