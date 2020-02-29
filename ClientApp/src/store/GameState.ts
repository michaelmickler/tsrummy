import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GameState {}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface IAction { type: 'ACTION' }
//export interface ShuffleDeckAction { type: 'SIGNALR_CONNECTED' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = IAction; 
//                                          | ShuffleDeckAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    action: () => ({ type: 'ACTION' } as IAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<GameState> = (state: GameState | undefined, incomingAction: Action): GameState => {

    if (state === undefined) {
        return { signal: null };
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'ACTION': return {};
        default: return state;
    }

};
