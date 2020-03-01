import React from "react";
import Deck from "../models/Deck";
import Card from "./Card";

interface IGameDeckProps { deck: Deck; updateId: string; }

export const GameDeck: React.FC<IGameDeckProps> = ({ deck, updateId }) => {
  return <Card>
    <div className="inlineblock relative">
      <div className="absolute all button_jar">
        <span className="inlineblock vmid autom">Draw Card</span>
      </div>
    </div>
  </Card>
};

export default GameDeck;