import "./css/Rummy.css";

import { TurnPhase } from "./models/Turn";
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

  return game.isReady && <div>

    <div className="ScreenLeft">
      <div className="CommonDiv">
        <React.Suspense fallback="Loading ...."><GameDeck Draw={game.Draw} updateId={updateId} deck={game.deck} /></React.Suspense>
        <React.Suspense fallback="Loading ...."><GamePile Draw={game.Draw} updateId={updateId} pile={game.pile} /></React.Suspense>
      </div>
      <hr />      
      <React.Suspense fallback="Loading ...."><PlayerCards Discard={game.Discard} isActive={game.players[0].name === game.turn.playerName} player={game.players[0]} /></React.Suspense>
      <React.Suspense fallback="Loading ...."><PlayerCards Discard={game.Discard} isActive={game.players[1].name === game.turn.playerName} player={game.players[1]} /></React.Suspense>
    </div>
    <div className="ScreenRight">
      <React.Suspense fallback={<>Loading ....</>}><Dialog updateId={updateId} /></React.Suspense><hr />
      <div>It is {game.turn.playerName}'s Turn</div>
      <div>{game.turn.Message}</div>
    </div>

  </div>;

};

export default connect()(Rummy);