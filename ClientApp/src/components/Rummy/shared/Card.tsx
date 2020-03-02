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

export const Icons: any = {
  "LeftArrow": <span>◀</span>,
  "RightArrao": <span>▶</span>
};

export const CardMark: React.FC<ICardMarkProps> = ({ card, type }) => {

  if(!card) { return <></>; }
  
  return <div className={`CardMark ${type}`}>
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