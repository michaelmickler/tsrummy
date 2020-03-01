import Card from "./Card";
import Player from "./Player";
import Score from "./Score";
import Deck from "./Deck";
import Observable from "./Observable";
import Turn, { ITurnResult, TurnPhase } from "./Turn";

export class Game extends Observable<Game> {

  isReady: boolean = false;
  players: Player[];
  playerMap: any = {};
  deck: Deck;
  pile: Card[] = [];
  history: ITurnResult[] = [];
  score: Record<string, Score>;
  turn: Turn;  

  constructor(players: Player[]) {
    super();
    this.score = {};
    this.players = players;
    this.deck = new Deck().Shuffle();    
    this.players.forEach(p => { 
      this.score[p.name] = new Score(0); 
      this.playerMap[p.name] = p;
    });
    this.deal();
    this.isReady = true;
    this.turn = new Turn(players[0].name);
    this.update();
  }  

  public deal = () => {
    let round = 0;
    while(round < 7) {
      this.players.forEach(p => {
        p.hand.push(this.deck.DrawTop());
      });
      round++;
    }
    let c = this.deck.DrawTop();
    c.flip();
    this.pile.push(c);
  };

  public GetPlayer = (playerName: string): Player => this.players.filter(p => p.name === playerName)[0];

  // pos (position) 0 = Deck, 1-x = Pile
  public Draw = (pos: number) => {
    
    let player = this.playerMap[this.turn.playerName];
    let cards;
    
    if(pos === 0) {
      cards = [this.deck.DrawTop()];      
    } else if(pos > 0) {
      cards = [this.pile.splice(pos - 1)];
    }
    
    player.hand = [ ...player.hand, ...cards ];
    this.turn.phase = TurnPhase.Discard;
    this.update();

  };

  public Discard = (pos: number) => {

    let card = this.playerMap[this.turn.playerName].hand.splice(pos, 1);

    this.pile.push(card);

    this.update();

  };

}

export default Game;