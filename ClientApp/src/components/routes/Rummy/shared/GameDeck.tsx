import * as css from "../../../css/css";

import React from "react";
import Deck from "../models/Deck";
import Card from "./Card";

interface IGameDeckProps { deck: Deck; addToPile: () => void }

export const deck_jar = { position: "relative", } as any;
export const button_jar = { position: "absolute", left: 0, right: 0, bottom: 0, top: 0, background: "#fff", zIndex: 302, } as any;
export const button_inner = { display: "inline-block", margin: "auto auto auto auto", verticalAlign: "middle", } as any;
export const card_jar = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 301, } as any;

export const GameDeck: React.FC<IGameDeckProps> = ({ deck, addToPile }) => {
  return <div style={deck_jar} onClick={(e: any) => { addToPile(); }}>
    <div style={button_jar}>
      <span style={button_inner}>Draw Card</span>
    </div>
    <div style={card_jar}>
      <Card />
    </div>
  </div>
};

export default GameDeck;