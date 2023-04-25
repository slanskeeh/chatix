import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import styles from "./Message.module.sass";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const date = new Date(message.date.seconds * 1000).toLocaleDateString(
    "ru-RU"
  );

  return (
    <div
      ref={ref}
      className={`${styles.message} ${
        message.senderId === currentUser.uid && `${styles.owner}`
      }`}
    >
      <div className={styles.message__info}>
        <img
          className={styles.message__info_img}
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <div className={styles.message__content}>
          <p className={styles.message__content_text}>{message.text}</p>
          {message.img && (
            <img
              className={styles.message__content_img}
              src={message.img}
              alt=""
            />
          )}
        </div>
      </div>
      <span className={styles.message__date}>{date}</span>
    </div>
  );
};

export default Message;
