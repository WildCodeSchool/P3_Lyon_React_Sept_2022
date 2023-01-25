import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { PostUserContextProvider } from "./contexts/PostUserContext";
import { CurrentUserContextProvider } from "./contexts/userContext";
import { TokenContextProvider } from "./contexts/TokenContext";
import { Admin, PostList, Profile, Main, Connexion, CreatePost } from "./pages";
import { PostDetails, ModifUser } from "./components";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <PostUserContextProvider>
        <CurrentUserContextProvider>
          <TokenContextProvider>
            <Routes>
              <Route path="/" element={<Connexion />} />
              <Route path="/feed" element={<Main />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/feed/:postId" element={<PostDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:user_id" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminUser" element={<PostList />} />
              <Route path="/adminUser/:id" element={<ModifUser />} />
            </Routes>
            <ToastContainer />
          </TokenContextProvider>
        </CurrentUserContextProvider>
      </PostUserContextProvider>
    </div>
  );
}

export default App;
