import mCard, { CardNames } from "../models/Card";
import React from "react";

export interface ICardProps {
  card?: mCard;
  children?: any;
  cssCard?: any;
  cssCardInner?: any;
  onClick?: any;
}
export interface ICardMarkProps {
  card: mCard;
  type: 'left' | 'right';
}

export const SuitIcons: any = {
  "Spades": <span>&#x2660;</span>,
  "Hearts": <span>&#x2665;</span>,
  "Diamonds": <span>&#x2666;</span>,
  "Clubs": <span>&#x2663;</span>,
};

export const CardMark: React.FC<ICardMarkProps> = ({ card, type }) => {

  const st_left = { top: 10, left: 10, right: "auto", bottom: "auto", };
  const st_right = { bottom: 10, right: 10, top: "auto", left: "auto", };

  if(!card) { return <></>; }
  
  return <div className="CardMark" style={ type === 'left' ? st_left : st_right }>    
    {
      card.isFaceDown ?
        <div></div> :
        <div>
          { type === 'right' && <div className={`${card.suit} Icon`}>{SuitIcons[card.suit]}</div> }
          <div>{(CardNames as any)[card.name]}</div>
          { type === 'left' && <div className={`${card.suit} Icon`}>{SuitIcons[card.suit]}</div> }
        </div>
    }
    
  </div>;

};

export const Card: React.FC<ICardProps> = ({ children, card, cssCard, cssCardInner, onClick }) => {
  
  return <div onClick={onClick || ((e) => null)} className="Card" style={{ ...(cssCard || {}) }}>
    <div className={`CardInner ${card && card.isFaceDown ? ' FaceDown' : ''}`}>
      <CardMark card={card} type='left' />
      {children}
      <CardMark card={card} type='right' />
    </div>
  </div>;

};

export default Card;