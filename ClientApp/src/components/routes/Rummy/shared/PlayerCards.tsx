import React from "react";
import mPlayer from "../models/Player";
import Game from "../models/Game";

export interface IPlayerCardsProps {
  Discard: (id: number) => void;
  player: mPlayer;
  isActive: boolean;
}

export const PlayerCards: React.FC<IPlayerCardsProps> = ({ Discard, isActive, player }) => {

  return <div className={`PlayerCards${isActive ? ' active' : ''}`}>
    <div><strong>{player.name}</strong><hr /></div>
    {
      player.hand.map((c, i) => {
        return c && <div key={i} onClick={e => { if(isActive) { Discard(i); } }}>
          <div>{c.read()}</div>
        </div>;
      })
    }
  </div>;

};

export default PlayerCards;