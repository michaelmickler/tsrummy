import "./css/Rummy.css";

import React from 'react';
import { connect } from 'react-redux';

import Player from './models/Player';
import Game from "./models/Game";

const GameDeck = React.lazy(() => import('./shared/GameDeck'));
const GamePile = React.lazy(() => import('./shared/GamePile'));
const PlayerCards = React.lazy(() => import('./shared/PlayerCards'));
const Dialog = React.lazy(() => import("./shared/Dialog"));

let game: Game;

let test_players = [ new Player("Michael Mickler"), new Player("Rachel Cope"), ];

const Rummy: React.FC<{}> = () => {

  if(!game) {
    game = new Game(test_players).subscribe((g => {
      setUpdateId(Math.random().toString().split('.')[1]);
    }));
  }

  let [updateId, setUpdateId] = React.useState(null);

  React.useEffect(() => { (window as any)._getState = () => { console.log(game); }; }, []);

  return game.isReady && <div>

    <div className="inlineblock eighty vtop">
      <div>
        <React.Suspense fallback="Loading ...."><GameDeck updateId={updateId} deck={game.deck} /></React.Suspense>
        <React.Suspense fallback="Loading ...."><GamePile updateId={updateId} pile={game.pile} /></React.Suspense>
      </div>
      <hr />
      <div>It is {game.turn.playerName}'s Turn</div>
      <React.Suspense fallback="Loading ...."><PlayerCards player={game.players[0]} /></React.Suspense>
      <React.Suspense fallback="Loading ...."><PlayerCards player={game.players[1]} /></React.Suspense>
    </div>
    <div className="inlineblock twenty vtop">
      <React.Suspense fallback={<>Loading ....</>}><Dialog updateId={updateId} /></React.Suspense>
    </div>

  </div>;

};

export default connect()(Rummy);