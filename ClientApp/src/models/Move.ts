export class Move implements IMove {
  playId = Math.random().toString().split('.')[1];
  cards: ICard[];
  points = 0;
  type: TMoveType;
}

export default Move;