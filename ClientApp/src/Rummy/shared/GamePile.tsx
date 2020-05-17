import React from "react";
import mCard from "../models/Card";

const Card = React.lazy(() => import ("./Card"));

export const GamePile: React.FC<IPileProps> = ({ pile, updateId, onClick }) => {
  
  let args: { onClick?: (e: Event, i: number) => void; } = {};
 
  return <div className="Pile">
    {
      pile.map((c, i) => {
        
        if(onClick) { args.onClick = e => onClick(e, i); }
        
        return <React.Suspense key={i} fallback="Loading ....">
          <Card card={c} cssCard={{ zIndex: 100 + i, left: (i * 18) + "px", }} { ...args }></Card>
        </React.Suspense>;

      })
    }
  </div>;
};

export default GamePile;




export interface IPileProps {
  onClick?: (e: Event, i: number) => void;
  updateId?: string;
  pile: mCard[];
}