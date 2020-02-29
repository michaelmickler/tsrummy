import * as React from 'react';
import * as css from "../../css/css";

import { connect } from 'react-redux';

import Player from './models/Player';
import Game from "./models/Game";

const GameDeck = React.lazy(() => import('./shared/GameDeck'));
const GamePile = React.lazy(() => import('./shared/GamePile'));
const PlayerCards = React.lazy(() => import('./shared/PlayerCards'));
const Dialog = React.lazy(() => import("../../shared/Dialog"));

const Rummy: React.FC<{}> = () => {

  let [game, setGame] = React.useState(new Game([
    new Player("Michael Mickler"),
    new Player("Rachel Cope"),
  ]).subscribe(g => {
    setGame(g);
  }));

  return game.isReady && <div>

    <div style={css.left}>
      <div>
        <GameDeck deck={game.deck} addToPile={() => {
          game.pile.push(game.deck.DrawTop());
          game.update();
          game.log();
        }} />
        <GamePile pile={game.pile} />
      </div>
      <hr />
      <PlayerCards player={game.players[0]} />
      <PlayerCards player={game.players[1]} />
    </div>
    <div style={css.right}>
      <React.Suspense fallback={<>Loading ....</>}>
        <Dialog />
      </React.Suspense>
    </div>

  </div>;

};

export default connect()(Rummy);