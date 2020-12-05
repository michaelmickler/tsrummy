declare enum TurnPhases {
  Draw = "Draw",
  Play = "Play",
  Discard = "Discard",
  Complete = "Complete",
}

declare type TTurnPhase = TurnPhases & any;

declare interface ITurn {

  draw: ICard[];
  moves: IMove[];
  discard: ICard;
  playerName: string;
  phase: TTurnPhase,
  mustPlay: ICard | null;
  cantDiscard: ICard | null;
  IsSubmitted: boolean;
  Message: string;

  Draw: (cards: ICard[]) => void;
  Play: (play: IMove) => void;
  checkPlayed: () => ICard | false;
  Discard: (card: ICard) => void;
  IsValid: () => boolean;
  Submit: () => ITurnResult;

}