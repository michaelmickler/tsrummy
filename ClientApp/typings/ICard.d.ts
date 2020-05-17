
interface ICardProps {
  card?: ICard;
  children?: any;
  cssCard?: any;
  cssCardInner?: any;
  onClick?: any;
}

interface ICardMarkProps {
  card: ICard;
  type: 'left' | 'right';
}

interface ICard {

  suit: string;
  name: string;
  
  read: () => string;
  flip: () => void;

  isFaceDown: boolean;

}