import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { PostUserContextProvider } from "./contexts/PostUserContext";
import { CurrentUserContextProvider } from "./contexts/userContext";
import { TokenContextProvider } from "./contexts/TokenContext";
import { PostDetails, AdminEspace, ModifUser } from "./components";
import { Connexion, Main, CreatePost, Profile, PostList } from "./pages";
import AddUserGroup from "./components/Admin/AddUserGroup";
import PageNotFound from "./components/PageNotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-[#F6F6FE]">
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
              <Route path="/adminUser" element={<PostList />} />
              <Route path="/adminUser/:id" element={<ModifUser />} />
              <Route
                path="/admin/add-user-group/:groupId"
                element={<AddUserGroup />}
              />
              <Route path="/adminEspace" element={<AdminEspace />} />
              {/* only match this when no other routes match */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer />
          </TokenContextProvider>
        </CurrentUserContextProvider>
      </PostUserContextProvider>
    </div>
  );
}

export default App;
