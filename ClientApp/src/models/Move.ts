import Card from "./Card";

export class Move {
  playId: string = Math.random().toString().split('.')[1];
  cards: Card[];
  points: number = 0;
  type: 'straight' | 'group' | 'addon';
}

export default Move;