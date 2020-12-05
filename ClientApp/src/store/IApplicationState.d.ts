declare interface IApplicationState {
  GameState: IGameState | undefined;
  SignalR: ISignalRState | undefined;
}