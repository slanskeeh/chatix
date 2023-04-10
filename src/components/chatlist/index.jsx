import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

import styles from "./ChatList.module.sass";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={styles.chats__userchat}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className={styles.chats__userchat_img}
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div>
              <span className={styles.chats__userchat_title}>
                {chat[1].userInfo.displayName}
              </span>
              <p className={styles.chats__userchat_text}>
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
