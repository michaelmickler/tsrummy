import React from "react";

interface IPileProps {
  onClick?: (e: Event, i: number, c: ICard) => void;
  updateId?: string;
  pile: ICard[];
}

const Card: any = React.lazy(() => import ("../Card/Index"));

export const GamePile: React.FC<IPileProps> = ({ pile, updateId, onClick }) => {
  
  let args: { onClick?: (e: Event, i: number, c: ICard) => void; } = {};
 
  return <div className="Pile">
    {
      pile.map((c, i) => {
        
        if(onClick) { args.onClick = e => onClick(e, i, c); }
        
        return <React.Suspense key={i} fallback="Loading ....">
          <Card card={c} cssCard={{ zIndex: 100 + i, left: (i * 18) + "px", }} { ...args }></Card>
        </React.Suspense>;

      })
    }
  </div>;
};

export default GamePile;