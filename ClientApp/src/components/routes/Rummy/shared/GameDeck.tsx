import React from "react";
import mDeck from "../models/Deck";
import Game from "../models/Game";

const Card = React.lazy(() => import("./Card"));



interface IGameDeckProps { Draw: any; deck: mDeck; updateId: string; }

export const GameDeck: React.FC<IGameDeckProps> = ({ Draw, deck, updateId }) => {
  
  return <div className="Deck">
    <React.Suspense fallback="Loading ....">
      <Card>      
        <span style={{ fontSize: "30px" }}></span>
        <span className="btn btn-xs btn-primary vmid autom" onClick={e => { Draw(0); }}>Draw Card</span>
      </Card>
    </React.Suspense>
  </div>;

};

export default GameDeck;