declare interface IDeck {

  Shuffle: () => IDeck;
  DrawTop: () => ICard;

  cards: ICard[];

}