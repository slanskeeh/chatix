import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

import styles from "./Navbar.module.sass";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__user}>
        <img
          src={currentUser.photoURL}
          alt=""
          className={styles.navbar__user_img}
        />
        <span className={styles.navbar__user_text}>
          {currentUser.displayName}
        </span>
      </div>
      <button
        className={styles.navbar__user_button}
        onClick={() => signOut(auth)}
      >
        Выход
      </button>
    </div>
  );
};

export default Navbar;
