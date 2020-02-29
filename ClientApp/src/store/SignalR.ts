import { Action, Reducer } from 'redux';
import { ApplicationState } from '.';

import SignalRClient from "../SignalR";

let connection = SignalRClient.GetConnection();

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SignalRState {
    connected: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface ConnectSignalR { type: 'SIGNALR_CONNECT' }
export interface Connect { type: 'CONNECT' } 
//export interface ShuffleDeckAction { type: 'SIGNALR_CONNECTED' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = ConnectSignalR | Connect; 
//                                          | ShuffleDeckAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getConnection = () => {
    return connection;
};

export const actionCreators = {
    Connect: () => (dispatch: any, getState: ApplicationState) => {
        connection.start().catch(console.log);
        dispatch(actionCreators.ConnectSignalR());        
    },
    ConnectSignalR: () => ({ type: 'SIGNALR_CONNECT' } as ConnectSignalR),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<SignalRState> = (state: SignalRState | undefined, incomingAction: Action): SignalRState => {

    if (state === undefined) {
        return { connected: false };
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'SIGNALR_CONNECT': return { connected: true };
        default: return state;
    }

};
