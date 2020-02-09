import * as React from 'react';
import { connect } from 'react-redux';

import SignalRClient from "../SignalR";
import Dialog from "./Dialog";

const Home = () => {
  
  let connection = SignalRClient.GetConnection();
    
  React.useEffect(() => {    
    connection.start().catch(console.log);
  }, []);

  return <div>

    <div style={{ display: "inline-block", width: "80%", verticalAlign: "top", }}></div>
    <div style={{ display: "inline-block", width: "20%", verticalAlign: "top", }}>
      <Dialog connection={connection} />      
    </div>

  </div>;



};

export default connect()(Home);
