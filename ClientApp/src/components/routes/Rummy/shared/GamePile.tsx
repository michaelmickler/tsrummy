import React from "react";
import mCard from "../models/Card";

const Card = React.lazy(() => import ("./Card"));

export interface IPileProps {
  Draw?: (index: number) => void;
  updateId?: string;
  pile: mCard[];
}

export const GamePile: React.FC<IPileProps> = ({ pile, updateId, Draw }) => {
  return <div className="Pile">
    {
      pile.map((c, i) => {
        return <React.Suspense key={i} fallback="Loading ....">
          <Card card={c}
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              e.cancelBubble = true;
              Draw(i + 1);
            }}
            cssCard={{ zIndex: 100 + i, left: (i * 40) + "px", }}
          ></Card>
        </React.Suspense>
      })
    }
  </div>;
};

export default GamePile;