import TurnPhase from "./TurnPhase";

export default class Turn implements ITurn {

  constructor(playerName: string) {
    this.playerName = playerName;
    this.Message = "Draw a card from the deck, or card(s) from the line.";
  }

  public draw: ICard[] = [];
  public moves: IMove[] = [];
  public discard: ICard = null;
  public playerName: string;
  public phase: TTurnPhase = TurnPhase.Draw;
  public mustPlay: ICard | null = null;
  public cantDiscard: ICard | null = null;
  public IsSubmitted: boolean = false;
  public Message: string;

  public Draw = (cards: ICard[]) => {
    this.draw = cards;
    this.phase = TurnPhase.Play;
    if(this.mustPlay) {
      this.Message = "Play the " + this.mustPlay.read() + " ....";
    } else {
      this.Message = "Play and/or discard ....";
    }
  };  
  
  public Play = (play: IMove) => { 
    this.moves.push(play);
  };  
  
  public checkPlayed = () => this.moves.reduce((result: ICard | false, move) => {
    let c: ICard | false = move.cards.filter((c: ICard) => c === this.mustPlay)[0];
    if(c) { result = c; }
    return result;
  }, false);  

  public Discard = (card: ICard) => {
    if(this.mustPlay && !this.checkPlayed()) {
      return false;            
    }
    this.discard = card;
    this.phase = TurnPhase.Complete;
    this.Message = "Turn complete.";
  };
  
  public IsValid = () => {

    if(this.draw.length === 0) {
      this.Message = 'Please draw from the Deck or Line';
      return false;
    } else {
      this.Message = '';
    }

    if(this.mustPlay) {
      if(!this.moves.reduce((result, move) => {
        let card: ICard = move.cards.filter(c => c === this.mustPlay)[0];
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
      } as ITurnResult;
    }
  };

}