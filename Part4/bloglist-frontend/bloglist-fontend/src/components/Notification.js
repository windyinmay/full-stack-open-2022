import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.includes("Added")) {
    return <div className="addingMessage">{message}</div>;
  } else if (message.includes("removed") || message.includes("failed")) {
    return <div className="deletingMessage">{message}</div>;
  } else if (message.includes("updated")) {
    return <div className="changingMessage">{message}</div>;
  }
  // const greenNoti = message.includes('Added') || message.includes('updated');
  // return(
  //     <div className={!greenNoti ? 'deletingMessage' : 'addingMessage'}>
  //         {message}
  //     </div>
  // )
};

export default Notification;
