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

    if(this.turn.phase !== TurnPhase.Draw) { return; }
    
    let player = this.playerMap[this.turn.playerName];
    let cards;
    
    if(pos === 0) {
      cards = [this.deck.DrawTop()];      
    } else if(pos > 0) {
      cards = this.pile.splice(pos - 1);
      this.turn.mustPlay = cards[0];   
    }
    
    player.hand = [ ...player.hand, ...cards ];

    this.turn.Draw(cards);

    this.update();

  };

  public Discard = (pos: number) => {

    if(this.turn.phase === TurnPhase.Draw) { return; }
    if(this.turn.mustPlay && !this.turn.checkPlayed()) { return; }

    let [card] = this.playerMap[this.turn.playerName].hand.splice(pos, 1);
    card.isFaceDown = false;

    this.pile.push(card);
    this.turn.Discard(card);

    this.history.push(this.turn.Submit());
    this.turn = new Turn(this.GetNextPlayerName());

    this.update();
    
  };

  public GetNextPlayerName = () => { 
    
    let { playerName } = this.players.reduce((result, player, index) => {      
      if(!result.done) {
        if(index === this.players.length - 1) {
          result.playerName = this.players[0].name;
          result.done = true;
        } else if(player.name === this.turn.playerName) {
          result.playerName = this.players[index + 1].name;
          result.done = true;      
        }
      }
      return result;
    }, { done: false, playerName: null });

    return playerName;

  };

}

export default Game;