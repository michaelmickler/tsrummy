import React from "react";
import Player from "../models/Player";

import { player_cards_col } from "../../../css/css";

export const PlayerCards: React.FC<{ player: Player; }> = ({ player }) => {

  return <div style={player_cards_col}>
    <strong>{player.name}</strong><hr />
    {
      player.hand.map((c, i) => {
        return c && <div key={i}>
          <div>{c.read()}</div>
        </div>;
      })
    }
  </div>;

};

export default PlayerCards;