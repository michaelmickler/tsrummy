class TurnResult implements ITurnResult { 
  playerName = "";
  draw = [] as ICard[]; 
  moves = [] as IMove[];
  discard = null as ICard;
}

export default TurnResult;