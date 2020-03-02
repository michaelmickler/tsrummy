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
  Play = "Play",
  Discard = "Discard",
  Complete = "Complete",
}

export default class Turn {

  constructor(playerName: string) {
    this.playerName = playerName;
    this.Message = "Draw a card from the deck, or card(s) from the line.";
  }

  public draw: Card[] = [];
  public moves: Move[] = [];
  public discard: Card | null = null;
  public playerName: string;
  public phase: TurnPhase = TurnPhase.Draw;
  public mustPlay?: Card = null;

  public Draw = (cards: Card[]) => {
    this.draw = cards;
    this.phase = TurnPhase.Play;
    if(this.mustPlay) {
      this.Message = "Play the " + this.mustPlay.read() + " ....";
    } else {
      this.Message = "Play and/or discard ....";
    }
  };
  
  public Play = (play: Move) => { this.moves.push(play); };  
  public checkPlayed = () => this.moves.reduce((result: Card | false, move) => {
    let c: Card | false = move.cards.filter((c: Card) => c === this.mustPlay)[0];
    if(c) { result = c; }
    return result;
  }, false);
  
  public Discard = (card: Card) => {
    if(this.mustPlay && !this.checkPlayed()) {
      return false;            
    }
    this.discard = card;
    this.phase = TurnPhase.Complete;
    this.Message = "Turn complete.";
  };

  public IsSubmitted: boolean = false;
  public Message: string;

  public IsValid = () => {

    if(this.draw.length === 0) {
      this.Message = 'Please draw from the Deck or Line';
      return false;
    } else {
      this.Message = '';
    }

    if(this.mustPlay) {
      if(!this.moves.reduce((result, move) => {
        let card = move.cards.filter(c => c === this.mustPlay)[0];
        if(card) { result = true; }
        return result;
      }, false)) {
        this.Message = 'Use must play the ' + this.mustPlay.read();
      }
    }

    if(!this.discard) {
      this.Message = 'Please discard';
      return false;
    } else {
      this.Message = '';
    }

    return true;

  };

  public Submit = (): ITurnResult => {
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