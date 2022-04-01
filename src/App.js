import Navbar from './components/Header/Navbar';
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
