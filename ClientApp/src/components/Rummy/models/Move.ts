import Card from "./Card";

export default class Move {
  playId: string = Math.random().toString().split('.')[1];
  cards: Card[];
  points: number = 0;
  type: 'straight' | 'group' | 'addon';
}