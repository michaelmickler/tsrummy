import React from "react";

export const Card: React.FC<{ children?: any; css?: any; }> = ({ children, css }) => {
  
  return <div className="CardJar inlineblock vmid" style={{ ...(css || {}), }}>
    {children}
  </div>;

};

export default Card;