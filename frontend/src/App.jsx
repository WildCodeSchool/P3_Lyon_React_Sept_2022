import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import PostDetails from "./components/Feed/PostContainer/PostDetails";

function App() {
  return (
    <div className="bg-background">
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/feed" element={<Main />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postdetails" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
