import { BrowserRouter, Route ,Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from './Pages/Login/Login';
import Comprar from './Pages/Comprar/Comprar';
import Adm from './Pages/Adm/Index';
import Home from './Pages/Home/Home';
import Cadastro from "./Pages/Login/Cadastro";
import Aprovar from "./Pages/Adm/Aprovar";
import Aprovados from "./Pages/Adm/Aprovados";

function App() {
  return (
    <BrowserRouter>
    <Header title='Festfy'/>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/comprar" element={<Comprar/>}/>
        <Route path="/adm" element={<Adm/>}/>
        <Route path="/aprovar" element={<Aprovar/>}/>
        <Route path="/aprovados" element={<Aprovados/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  
  )
}

export default App;
