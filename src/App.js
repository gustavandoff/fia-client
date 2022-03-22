import Navbar from './components/Header/Navbar';
import Game from './components/Game/Game';
import { Outlet } from "react-router-dom";

function App({ currentUser, setCurrentUser }) {

  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Outlet />
    </div>
  );
}

export default App;
