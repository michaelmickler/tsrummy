import * as React from "react";
import * as SignalR from "../../store/SignalR";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";

export const Dialog: React.FC<{ getConnection?: () => any; Connect: any; }> = ({ getConnection, Connect, }) => {

  let input = React.useRef(null);

  React.useEffect(() => {
    SignalR.getConnection().on("receiveMessage", (username: string, message: string) => {
      console.log("received");
      setDialog(dialog + `\n${username}: ${message}`);
    });
    Connect();
  }, []);

  let [dialog, setDialog] = React.useState("");

  const submit = (e: any) => {
    
    e.preventDefault();
    
    if(input && input.current) {
      SignalR.getConnection().invoke("sendMessage", "michaelmickler", input.current.value).catch(console.log);
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

export const mapState = (state: ApplicationState) => ({ isConnected: state.SignalR.connected, });
export const mapDispatch = SignalR.actionCreators;

export default connect(mapState, mapDispatch)(Dialog);