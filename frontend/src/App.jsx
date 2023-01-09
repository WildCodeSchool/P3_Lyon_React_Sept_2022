import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

import { PostUserContextProvider } from "./contexts/PostUserContext";

function App() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-background">
      <PostUserContextProvider>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/feed" element={<Main />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </PostUserContextProvider>
    </div>
  );
}

export default App;
