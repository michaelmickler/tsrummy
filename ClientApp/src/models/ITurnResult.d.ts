declare interface ITurnResult {
  playerName: string;
  draw: ICard[];
  moves: IMove[];
  discard: ICard;
}