import * as SignalR from "../../store/SignalR";

import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../store";

interface IDialogProps {
  Connect?: any;
  updateId?: string;
  dialog?: any;
}

export const Dialog: React.FC<IDialogProps> = ({ Connect, updateId }) => {

  let input = React.useRef(null);
  
  React.useEffect(() => { 
    SignalR.GetConnection().on("receiveMessage", (username: string, message: string) => {
      console.log("received");
      setDialog(dialog + `\n${username}: ${message}`);
    });
    Connect();
  }, []);

  let [dialog, setDialog] = React.useState("");

  const submit = (e: any) => {

    e.preventDefault();

    if (input && input.current) {
      SignalR.GetConnection().invoke("sendMessage", "michaelmickler", input.current.value).catch(console.log);
    }

    input.current.value = "";

  };

  return <>
    <h4>Chat</h4><hr />
    <div>{dialog}</div>
    <form onSubmit={submit}>
      <input ref={input} />
    </form>
  </>;

};

export const mapState = (state: IApplicationState) => ({ isConnected: state.SignalR.connected, });
export const mapDispatch = SignalR.actionCreators;

export default connect(mapState, mapDispatch)(Dialog);