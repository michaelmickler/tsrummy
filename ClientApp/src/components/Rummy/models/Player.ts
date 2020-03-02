import Card from "./Card";

export class Player {

  constructor(name: string) {
    this.name = name;
  }

  hand: Card[] = [];
  name: string;

  staging: Card[] = [];

}

export default Player;