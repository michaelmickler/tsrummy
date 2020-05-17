import React from "react";
import mDeck from "../models/Deck";

const Card = React.lazy(() => import("./Card"));

export const GameDeck: React.FC<IGameDeckProps> = ({ onClick, deck, updateId }) => {

  let props: any & { onClick?: (e: Event, pos: number) => void; } = {};

  if(onClick) {
    props.onClick = (e: Event) => { onClick(e, 0); };
  }

  
  return <div className="Deck">
    <React.Suspense fallback="Loading ....">
      <Card { ...props }></Card>
    </React.Suspense>
  </div>;

};

export default GameDeck;




interface IGameDeckProps { 
  onClick: (e: Event, pos: number) => void;
  deck: mDeck;
  updateId: string;
}