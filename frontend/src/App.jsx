import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import EditProfile from "./components/Navbar/Profile/EditProfile";

function App() {
  return (
    <div className="bg-background">
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/feed" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
