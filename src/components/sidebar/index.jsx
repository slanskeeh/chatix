import React from "react";
import Navbar from "../navbar";
import Search from "../search";
import Chats from "../chatlist";

import styles from "./Sidebar.module.sass";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
