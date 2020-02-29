import Card from "./Card";

export class Player {

  constructor(name: string) {
    this.name = name;
  }

  hand: Card[] = [];
  name: string;

}

export default Player;