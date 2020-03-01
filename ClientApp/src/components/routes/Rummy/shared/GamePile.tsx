import React from "react";
import Card from "../models/Card";

const RCard = React.lazy(() => import ("./Card"));

export const GamePile: React.FC<{ updateId?: string; pile: Card[]; }> = ({ pile, updateId }) => {
  return <div className="inlineblock vtop relative Pile">
    {
      pile.map((c, i) => {
        return <React.Suspense key={i} fallback="Loading ....">
          <RCard css={{ marginLeft: (i * 9) + "px" }}>
            Test
          </RCard>
        </React.Suspense>
      })
    }
  </div>;
};

export default GamePile;