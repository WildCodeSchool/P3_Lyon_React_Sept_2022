import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import EditProfile from "./components/Navbar/Profile/EditProfile";

import { PostUserContextProvider } from "./contexts/PostUserContext";

function App() {
  return (
    <div className="bg-background">
      <PostUserContextProvider>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/feed" element={<Main />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user_id" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </PostUserContextProvider>
    </div>
  );
}

export default App;
