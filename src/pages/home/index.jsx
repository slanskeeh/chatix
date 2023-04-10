import React from "react";
import Sidebar from "../../components/sidebar";
import Chat from "../../components/chat";

import styles from "./Home.module.sass";

const Home = () => {
  return (
    <div className={`home ${styles.home}`}>
      <div className={`container ${styles.home__container}`}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
