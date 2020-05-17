export enum CardSuit {
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Spades = "Spades",
  Clubs = "Clubs",
}

export const CardNames = {
  "Two": "2",
  "Three": "3",
  "Four": "4",
  "Five": "5",
  "Six": "6",
  "Seven": "7",
  "Eight": "8",
  "Nine": "9",
  "Ten": "10",
  "Jack": "J",
  "Queen": "Q",
  "King": "K",
  "Ace": "A",
};

export enum CardName {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "Jack",
  Queen = "Queen",
  King = "King",
  Ace = "Ace",
}

export class Card implements ICard {

  constructor(suit: string, name: string) {
    this.suit = suit;
    this.name = name;
  }

  public isFaceDown: boolean = true;

  public suit: string;
  public name: string;
  
  public read = () => this.name + " of " + this.suit;
  public flip = () => this.isFaceDown = !this.isFaceDown;

}

export default Card;