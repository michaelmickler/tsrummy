import React from "react";
import Card from "../models/Card";
import { pile_col } from "../../../css/css"; 

const RCard = React.lazy(() => import ("./Card"));

export const GamePile: React.FC<{ pile: Card[]; }> = ({ pile, }) => {
  return <>
    <div style={pile_col}>
      {
        pile.map((c, i) => {
          return <RCard key={i} />
        })
      }
    </div>    
  </>;
};

export default GamePile;