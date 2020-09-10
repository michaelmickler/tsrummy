import { Action, Reducer } from 'redux';

export interface IGameState {}
export interface IAction { type: 'ACTION' }
export type KnownAction = IAction; 

export const actionCreators = {
    action: () => ({ type: 'ACTION' } as IAction),
};

export const reducer: Reducer<IGameState> = (state: IGameState | undefined, incomingAction: Action): IGameState => {

    if (state === undefined) { return { signal: null }; }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'ACTION': return {};
        default: return state;
    }

};
