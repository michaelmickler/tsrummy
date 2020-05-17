import React from "react";
import mPlayer from "../models/Player";

const GamePile = React.lazy(() => import("./GamePile"));

export const PlayerCards: React.FC<IPlayerCardsProps> = ({ Discard, player, updateId, }) => {

  const DiscardToPile = (e: Event, i: number) => { Discard(i); };

  return <div className={`PlayerCards`}>
    <div><strong>{player.name}</strong><hr /></div>
    <React.Suspense fallback="Loading ...."><GamePile onClick={DiscardToPile} pile={player.hand} /></React.Suspense>
    <React.Suspense fallback="Loading ...."><GamePile pile={player.staging} /></React.Suspense>
    {/* {
      player.hand.map((c, i) => {
        return c && <div key={i} onClick={e => { if(isActive) { Discard(i); } }}>
          <div>{c.read()}</div>
        </div>;
      })
    } */}
  </div>;

};

export default PlayerCards;




export interface IPlayerCardsProps {
  Discard: (id: number) => void;
  player: mPlayer;
  //isActive: boolean;
  updateId: string;
}