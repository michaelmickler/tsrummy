import Card from "./Card";
import { CardName } from "./CardName";
import { CardSuit } from "./CardSuit";

export class Deck implements IDeck {

  constructor() {

    let cards: ICard[] = [];

    for(let suit in CardSuit) {
      for(let name in CardName) {
        cards.push(new Card(suit, name));
      }
    }
    
    this.cards = cards;

  }

  public Shuffle = () => {
    
    let cards = [ ...this.cards ];
    let new_cards = [];

    while(new_cards.length < 52) {      
      new_cards.push(cards.splice(Math.floor(Math.random()*cards.length),1)[0]);
    }
    this.cards = new_cards;

    return this;

  };

  public DrawTop = (): ICard => {
    let cards = [ ...this.cards ];
    let card = cards.pop();
    this.cards = cards;
    return card;
  };
  
  public cards: ICard[];

}

export default Deck;