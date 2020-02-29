import React from "react";

export const Card: React.FC<{ children?: any; }> = ({ children }) => {
  
  return <div style={{ 
    display: "inline-block", 
    verticalAlign: "middle", 
    width: "180px", 
    height: "240px", 
    textAlign: "center",
    border: "solid 1px #444",
    borderRadius: "9px", 
  }}>
    {children}
  </div>;

};

export default Card;