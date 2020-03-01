import React from "react";
import mPlayer from "../models/Player";

export const PlayerCards: React.FC<{ player: mPlayer; isActive: boolean; }> = ({ isActive, player }) => {

  return <div className={`PlayerCards${isActive ? ' active' : ''}`}>
    <div><strong>{player.name}</strong><hr /></div>
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