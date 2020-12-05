declare interface IGame extends IObservable<IGame> {

  isReady: boolean;
  players: IPlayer[];
  playerMap: { [key: string]: IPlayer };
  deck: IDeck;
  pile: ICard[];
  history: ITurnResult[];
  score: Record<string, IScore>;
  turn: ITurn;

  Deal: () => void;
  GetPlayer: (playerName: string) => IPlayer;
  Draw: (pos: number) => void;
  Discard: (pos: number) => void;
  Stage: (pos: number, player: IPlayer) => void;
  UnStage: (pos: number, player: IPlayer) => void;
  GetNextPlayerName: () => string;
  GetScoreHistory: () => ITurnHistory;
  ActivePlayer: () => IPlayer;
  Score: () => void;

}