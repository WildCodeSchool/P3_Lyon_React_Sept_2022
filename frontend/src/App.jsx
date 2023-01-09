import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { PostUserContextProvider } from "./contexts/PostUserContext";
import { CurrentUserContextProvider } from "./contexts/userContext";
import Admin from "./pages/Admin";
import PostList from "./pages/PostList";

function App() {
  return (
    <div className="bg-background">
      <CurrentUserContextProvider>
        <PostUserContextProvider>
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/feed" element={<Main />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:user_id" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminUser" element={<PostList />} />
          </Routes>
        </PostUserContextProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
