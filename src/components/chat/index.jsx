import React, { useContext } from "react";
import Messages from "../messagelist";
import Input from "../input";
import { ChatContext } from "../../context/ChatContext";

import styles from "./Chat.module.sass";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles.chat__info}>
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
