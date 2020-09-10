import "../css/global.css";

import React from 'react';
import mPlayer from '../models/Player';
import mGame from "../models/Game";
import { connect } from 'react-redux';

const GameDeck = React.lazy(() => import('./GameDeck/Index'));
const GamePile = React.lazy(() => import('./GamePile/Index'));
const PlayerCards = React.lazy(() => import('./PlayerCards/Index'));
const Dialog = React.lazy(() => import("./Dialog/Index"));

let game: mGame;
let test_players = [ new mPlayer("Michael Mickler"), new mPlayer("Rachel Cope"), ];

const Rummy: React.FC<{}> = () => {

  if(!game) {
    game = new mGame(test_players).subscribe((g => {
      setUpdateId(Math.random().toString().split('.')[1]);
    }));
    window._getState = () => { console.log(game); }; 
  }

  let [updateId, setUpdateId] = React.useState(null);

  const DrawFromPile = (e: Event, pos: number) => game.Draw(pos + 1);
  const DrawFromDeck = (e: Event, pos: number) => game.Draw(0);
 
  return game.isReady && <div>

    <div className="ScreenLeft">
      <div className="CommonDiv">
        <React.Suspense fallback="Loading ....">
          <GameDeck onClick={DrawFromDeck} updateId={updateId} deck={game.deck} />
        </React.Suspense>
        <React.Suspense fallback="Loading ....">
          <GamePile onClick={DrawFromPile} updateId={updateId} pile={game.pile} />
        </React.Suspense>
      </div>
      <hr />
      <React.Suspense fallback="Loading ....">
        <PlayerCards game={game} updateId={updateId} />
      </React.Suspense>
    </div>
    <div className="ScreenRight">
      <React.Suspense fallback={<>Loading ....</>}>
        <Dialog updateId={updateId} />
      </React.Suspense><hr />
      <div>It is {game.turn.playerName}'s Turn</div>
      <div>{game.turn.Message}</div>
    </div>

  </div>;

};

export default connect()(Rummy);