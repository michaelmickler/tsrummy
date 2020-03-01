import React from "react";
import mCard from "../models/Card";

const Card = React.lazy(() => import ("./Card"));

export const GamePile: React.FC<{ updateId?: string; pile: mCard[]; }> = ({ pile, updateId }) => {
  return <div className="Pile">
    {
      pile.map((c, i) => {
        return <React.Suspense key={i} fallback="Loading ....">
          <Card card={c} css={{ marginLeft: (i * 9) + "px" }}></Card>
        </React.Suspense>
      })
    }
  </div>;
};

export default GamePile;