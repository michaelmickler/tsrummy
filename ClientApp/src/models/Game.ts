import { CardPoints } from "./CardPoints";
import { CardOrder } from "./CardOrder";

import Player from "./Player";
import Score from "./Score";
import Deck from "./Deck";
import Observable from "./Observable";
import Move from "./Move";
import Turn from "./Turn";
import TurnPhase from "./TurnPhase";

export class IsSuited { result: boolean = true; suit: string | null = null; }
export class IsSet { result: boolean = true; name: string | null = null; }
export class IsStraight { result: boolean = true; }

export class Game extends Observable<Game> implements IGame {

  isReady: boolean = false;
  players: IPlayer[];
  playerMap: { [key: string]: IPlayer } = {};
  deck: IDeck;
  pile: ICard[] = [];
  history: ITurnResult[] = [];
  score: Record<string, Score> = {};
  turn: ITurn;  

  constructor(players: Player[]) {
    super();
    this.players = players;
    this.deck = new Deck().Shuffle();    
    this.players.forEach(p => {
      this.score[p.name] = new Score(0); 
      this.playerMap[p.name] = p;
    });
    this.Deal();
    this.isReady = true;
    this.turn = new Turn(players[0].name);
    this.update();
  }
  
  public Deal = () => {
    let round = 0;
    while(round < 7) {
      this.players.forEach(p => {
        let c = this.deck.DrawTop();
        c.flip();
        p.hand.push(c);
      });
      round++;
    }
    let c = this.deck.DrawTop();
    c.flip();
    this.pile.push(c);
  };

  public GetPlayer = (playerName: string): IPlayer => this.players.filter(p => p.name === playerName)[0];

  public Draw = (pos: number) => {

    if(this.turn.phase !== TurnPhase.Draw) { return; }
    
    let player = this.playerMap[this.turn.playerName];
    let cards: ICard[];
    
    if(pos === 0) {
      cards = [this.deck.DrawTop()];
      for(var c of cards) { c.flip(); }
    } else if(pos > 0) {
      cards = this.pile.splice(pos - 1);
      this.turn.cantDiscard = cards[0];
      if(cards.length > 1) {
        this.turn.mustPlay = cards[0];        
      }
    }

    player.hand = [ ...player.hand, ...cards ];

    this.turn.Draw(cards);

    this.update();

  };

  public Discard = (pos: number) => {
    
    if(this.turn.phase === TurnPhase.Draw) { return; }    
    if(this.turn.mustPlay && !this.turn.checkPlayed()) { return; }

    let player = this.playerMap[this.turn.playerName];

    if(player.staging.length > 0) { return; }
    if(this.turn.cantDiscard && player.hand[pos] === this.turn.cantDiscard) { return; }
    
    let [card] = player.hand.splice(pos, 1);

    card.isFaceDown = false;

    this.pile.push(card);
    this.turn.Discard(card);

    this.history.push(this.turn.Submit());
    this.turn = new Turn(this.GetNextPlayerName());

    this.update();
    
  };

  public UnStage = (pos: number, player: IPlayer) => {
    let [card] = player.staging.splice(pos, 1);
    player.hand.push(card);
    this.update();
  };

  public Stage = (pos: number, player: IPlayer) => {

    player.staging.push(player.hand.splice(pos, 1)[0]);
    this.update();    

  };
  
  public Score = () => {

    let p = this.ActivePlayer();
    let m = new Move();

    let isSet: IsSet = p.staging.reduce((r: IsSet, c: ICard) => {
      if(!r.name) { r.name = c.name; }
      else if(r.name !== c.name) { r.result = false; }      
      return r;
    }, new IsSet());

    let isSuited: IsSuited = p.staging.reduce((r: IsSuited, c: ICard) => {
      if(!r.suit) { r.suit = c.suit; }
      else if(r.suit !== c.suit) { r.result = false; }
      return r;
    }, new IsSuited());

    if(!isSet.result && !isSuited.result) {
      console.log("Straights must be of the same suit...");
      return;      
    }

    if(isSet.result) {

      console.log("You have a set of " + p.staging[0].name + "s");
      m.points = p.staging.reduce((points: number, card: ICard) => (points + CardPoints[card.name]), 0);
      m.cards = p.staging.splice(0, p.staging.length);
      m.type = "group";
      this.turn.Play(m);
      this.update();      
      return;

    } else {
      
      let isStraight: IsStraight = p.staging.reduce((r: IsStraight, c: ICard) => {
        let _result = p.staging.reduce((_r: boolean, _c: ICard) => {
          let p1 = CardOrder.indexOf(c.name);
          let p2 = CardOrder.indexOf(_c.name);
          let isAdjacent = Math.abs(p1 - p2) === 1;
          if(isAdjacent) { _r = true; }
          return _r;
        }, false);
        if(!_result) { r.result = false; }
        return r;
      }, new IsStraight());

      if(isStraight.result) {
        console.log("You appear to have a straight...");
      } else {
        console.log("Doesn't look like a straight...");
      }

    }    

  };

  public GetNextPlayerName = (): string => {
    
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

  public GetScoreHistory: () => ITurnHistory = () => {
    let scoreHistory: ITurnHistory = this.history.reduce((history: ITurnHistory, turn: ITurnResult) => {
      if(!history[turn.playerName]) { history[turn.playerName] = []; }
      if(turn.moves.length > 0) { history[turn.playerName].push(turn); }
      return history;
    }, {});
    return scoreHistory;
  };

  public ActivePlayer = (): IPlayer => this.playerMap[this.turn.playerName];

}

export default Game;