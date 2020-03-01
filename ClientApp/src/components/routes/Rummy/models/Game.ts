import Card from "./Card";
import Player from "./Player";
import Score from "./Score";
import Deck from "./Deck";
import Observable from "./Observable";
import Turn, { ITurnResult } from "./Turn";

export class Game extends Observable<Game> {

  isReady: boolean = false;
  players: Player[];
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
    this.players.forEach(p => { this.score[p.name] = new Score(0); });
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

}

export default Game;