interface IScore {
  points: number;
  wins?: number;
}

export class Score implements IScore {

  constructor(points: number = 0) {
    this.points = points;
  }

  points: number;
  wins?: number = 0;

}

export default Score;