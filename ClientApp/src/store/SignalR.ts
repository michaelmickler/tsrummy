import { Action, Reducer } from 'redux';
import { IApplicationState } from '.';

import SignalRClient from "../models/SignalR";

const connection = SignalRClient.GetConnection();

export interface ISignalRState { connected: boolean; }
export interface IConnectSignalR { type: 'SIGNALR_CONNECT' }
export interface IConnect { type: 'CONNECT' } 

type KnownAction = IConnectSignalR | IConnect; 

export const GetConnection = () => connection;

export const actionCreators = {
    Connect: () => async (dispatch: any, getState: IApplicationState) => {
        connection.start().catch(console.log);
        dispatch(actionCreators.ConnectSignalR());        
    },
    ConnectSignalR: () => ({ type: 'SIGNALR_CONNECT' } as IConnectSignalR),
};

export const reducer: Reducer<ISignalRState> = (state: ISignalRState | undefined, incomingAction: Action): ISignalRState => {

    if (state === undefined) {
        return { connected: false };
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'SIGNALR_CONNECT': return { connected: true };
        default: return state;
    }

};