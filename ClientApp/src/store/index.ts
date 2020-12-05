import { reducer as gameReducer } from './GameState';
import { reducer as signalrReducer } from './SignalR';

export const reducers = {
    GameState: gameReducer,
    SignalR: signalrReducer,
};