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