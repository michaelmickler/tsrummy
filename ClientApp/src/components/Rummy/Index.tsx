import "./css/Rummy.css";

import React from 'react';
import { connect } from 'react-redux';

import mPlayer from './models/Player';
import mGame from "./models/Game";

const GameDeck = React.lazy(() => import('./shared/GameDeck'));
const GamePile = React.lazy(() => import('./shared/GamePile'));
const PlayerCards = React.lazy(() => import('./shared/PlayerCards'));
const Dialog = React.lazy(() => import("./shared/Dialog"));

let game: mGame;
let test_players = [ new mPlayer("Michael Mickler"), new mPlayer("Rachel Cope"), ];

const Rummy: React.FC<{}> = () => {

  if(!game) {
    game = new mGame(test_players).subscribe((g => {
      setUpdateId(Math.random().toString().split('.')[1]);
    }));
  }

  let [updateId, setUpdateId] = React.useState(null);

  React.useEffect(() => { (window as any)._getState = () => { console.log(game); }; }, []);

  const DrawFromPile = (e: Event, pos: number) => game.Draw(pos + 1);
  const DrawFromDeck = (e: Event, pos: number) => game.Draw(0);

  const activePlayer = game.playerMap[game.turn.playerName];

  return game.isReady && <div>

    <div className="ScreenLeft">
      <div className="CommonDiv">
        <React.Suspense fallback="Loading ...."><GameDeck onClick={DrawFromDeck} updateId={updateId} deck={game.deck} /></React.Suspense>
        <React.Suspense fallback="Loading ...."><GamePile onClick={DrawFromPile} updateId={updateId} pile={game.pile} /></React.Suspense>
      </div>
      <hr />
      <React.Suspense fallback="Loading ...."><PlayerCards updateId={updateId} Discard={game.Discard} player={activePlayer} /></React.Suspense>      
    </div>
    <div className="ScreenRight">
      <React.Suspense fallback={<>Loading ....</>}><Dialog updateId={updateId} /></React.Suspense><hr />
      <div>It is {game.turn.playerName}'s Turn</div>
      <div>{game.turn.Message}</div>
    </div>

  </div>;

};

export default connect()(Rummy);