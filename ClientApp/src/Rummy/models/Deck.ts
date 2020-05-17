import Card, { CardSuit, CardName } from "./Card";

export class Deck {

  constructor() {

    let cards: Card[] = [];

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

  public DrawTop = (): Card => { 
    let cards = [ ...this.cards ];
    let card = cards.pop();
    this.cards = cards;
    return card;
  };
  
  public cards: Card[];

}

export default Deck;