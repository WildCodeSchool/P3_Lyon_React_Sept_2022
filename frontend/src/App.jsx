import { Routes, Route } from "react-router-dom";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/feed" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
