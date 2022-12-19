import "./App.css";
import Connexion from "./pages/Connexion";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Connexion />
      <Header />
      <Feed />
    </div>
  );
}

export default App;
