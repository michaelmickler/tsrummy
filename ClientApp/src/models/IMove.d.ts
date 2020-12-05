declare interface IMove {
  playId: string;
  cards: ICard[];
  points: number;
  type: TMoveType;
}