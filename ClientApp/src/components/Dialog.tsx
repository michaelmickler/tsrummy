import * as React from "react";
import SignalRClient from "../SignalR";

export const Dialog: React.FC<{ connection: any; }> = ({ connection }) => {

  let input = React.useRef(null);

  connection.on("receiveMessage", (username: string, message: string) => {
    console.log("received");
    setDialog(dialog + `\n${username}: ${message}`);
  });

  let [dialog, setDialog] = React.useState("");

  const submit = (e: any) => {
    
    e.preventDefault();
    
    if(input && input.current) {
      connection.invoke("sendMessage", "michaelmickler", input.current.value).catch(console.log);
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

export default Dialog;