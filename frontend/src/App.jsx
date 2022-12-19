import Connexion from "./pages/Connexion";
import "./App.css";
import CreatePost from "./components/Feed/CreatePostContainer/CreatePost";

function App() {
  return (
    <div className="App">
      <Connexion />
      <CreatePost />
    </div>
  );
}

export default App;
