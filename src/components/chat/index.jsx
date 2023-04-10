import React, { useContext } from "react";
import Messages from "../messagelist";
import Input from "../input";
import { ChatContext } from "../../context/ChatContext";

import styles from "./Chat.module.sass";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
