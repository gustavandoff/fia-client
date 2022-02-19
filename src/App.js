import Header from './components/Header';
import Game from './components/Board/Game';

let defaultPlayers = [
  {
    username: 'gustav',
    playerNumber: 1,
    color: 'red',
    pieces: [
      {
        number: 0,
        position: -11,
        color: 'red'
      },
      {
        number: 1,
        position: -12,
        color: 'red'
      },
      {
        number: 2,
        position: -13,
        color: 'red'
      },
      {
        number: 3,
        position: 15,
        color: 'red'
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
        color: 'yellow'
      },
      {
        number: 1,
        position: -22,
        color: 'yellow'
      },
      {
        number: 2,
        position: -23,
        color: 'yellow'
      },
      {
        number: 3,
        position: -24,
        color: 'yellow'
      }
    ]
  }
];

function App() {
  const gameTitle = 'Fia';

  return (
    <div className="App">
      <Header title={gameTitle} />
      <Game defaultPlayers={defaultPlayers} />
    </div>
  );
}

export default App;
