export class Player implements IPlayer {

  constructor(name: string) {
    this.name = name;
  }

  hand: ICard[] = [];
  name: string;

  staging: ICard[] = [];

}

export default Player;