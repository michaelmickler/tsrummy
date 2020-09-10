import * as SignalR from "@microsoft/signalr";

let r: SignalR.HubConnection | null;

interface ISignalRClient {
  GetConnection?: () => SignalR.HubConnection | null;
}

export default class SignalRClient implements ISignalRClient {
  
  public static GetConnection() {
    if(r instanceof SignalR.HubConnection) {
      return r;
    } else {
      r = new SignalR.HubConnectionBuilder().withUrl("/GameHub").build();
      return r;
    }
  }
  
}