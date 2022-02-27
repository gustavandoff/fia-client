import Navbar from './components/Header/Navbar';
import Game from './components/Game/Game';
import { useState } from 'react';

let defaultPlayers = [
  {
    username: 'gustav',
    playerNumber: 1,
    color: 'red',
    pieces: [
      {
        number: 0,
        position: -11,
      },
      {
        number: 1,
        position: -12,
      },
      {
        number: 2,
        position: -13,
      },
      {
        number: 3,
        position: 15,
      }
    ]
  },
  {
    username: 'gun',
    playerNumber: 2,
    color: 'yellow',
    pieces: [
      {
        number: 0,
        position: -21,
      },
      {
        number: 1,
        position: -22,
      },
      {
        number: 2,
        position: -23,
      },
      {
        number: 3,
        position: -24,
      }
    ]
  }
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {<Game defaultPlayers={defaultPlayers} />
      }
    </div>
  );
}

export default App;
