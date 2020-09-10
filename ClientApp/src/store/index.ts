import { reducer as gameReducer, IGameState } from './GameState';
import { reducer as signalrReducer, ISignalRState } from './SignalR';

export interface IApplicationState {
    GameState: IGameState | undefined;
    SignalR: ISignalRState | undefined;
}

export const reducers = {
    GameState: gameReducer,
    SignalR: signalrReducer,
};

export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
