import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import EditProfile from "./components/Navbar/Profile/EditProfile";
import Admin from "./pages/Admin";
import PostList from "./pages/PostList";

function App() {
  return (
    <div className="bg-background">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/feed" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminUser" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default App;
