declare interface ICard {
  
  isFaceDown: boolean;
  suit: string;
  name: string;

  read: () => string;
  flip: () => void;

}