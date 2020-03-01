import Card from "./Card";
import Move from "./Move";

export interface ITurnResult { 
  playerName: string;
  draw: Card[]; 
  moves: Move[], 
  discard: Card,
}

export enum TurnPhase {
  Draw = "Draw",
  Discard = "Discard",
  Complete = "Complete",
}

export default class Turn {

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  public draw: Card[] = [];
  public moves: Move[] = [];
  public discard: Card | null = null;
  public playerName: string;
  public phase: TurnPhase = TurnPhase.Draw;

  public SubmitDraw = (cards: Card[]) => { this.draw = cards; this.phase = TurnPhase.Discard; };  
  public AddPlay = (play: Move) => { this.moves.push(play); };  
  public SubmitDiscard = (card: Card) => { this.discard = card; this.phase = TurnPhase.Complete; };

  public IsSubmitted: boolean = false;
  public Message: string;

  public IsValid = () => {

    if(this.draw.length === 0) {
      this.Message = 'Please draw from the Deck or Line';
      return false;
    } else {
      this.Message = '';
    }

    if(!this.discard) {
      this.Message = 'Please discard';
      return false;
    } else {
      this.Message = '';
    }

    return true;

  };

  public Submit = (cb: any): ITurnResult => {
    if(this.IsValid()) {
      this.IsSubmitted = true;
      this.Message = '';
      return {
        playerName: this.playerName,
        draw: this.draw,
        moves: this.moves,
        discard: this.discard,
      };
    }
  };


}