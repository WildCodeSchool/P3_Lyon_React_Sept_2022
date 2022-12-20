import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/feed" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
