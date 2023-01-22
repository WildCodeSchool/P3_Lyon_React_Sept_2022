import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import Connexion from "./pages/Connexion";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { PostUserContextProvider } from "./contexts/PostUserContext";
import { CurrentUserContextProvider } from "./contexts/userContext";
import Admin from "./pages/Admin";
import PostList from "./pages/PostList";
import ModifUser from "./components/Admin/ModifUser";
import PostDetails from "./components/Feed/PostContainer/PostDetails";

function App() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`${darkMode ? "bg-gray-800" : " bg-blue-100"}`}>
      <PostUserContextProvider>
        <CurrentUserContextProvider>
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route
              path="/feed"
              element={
                <Main toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              }
            />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/feed/:postId" element={<PostDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:user_id" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminUser" element={<PostList />} />
            <Route path="/adminUser/:id" element={<ModifUser />} />
          </Routes>
          <ToastContainer />
        </CurrentUserContextProvider>
      </PostUserContextProvider>
    </div>
  );
}

export default App;
