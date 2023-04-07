import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import { PulseLoader } from "react-spinners";
import backgroundImage from "../../img/login_back.jpg";

import styles from "./Login.module.sass";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const target = e.target;
    validation(target);

    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        break;
    }
  };

  const validation = (target) => {
    if (target.name === "email") {
      if (!target.value) {
        setErr((state) => ({
          ...state,
          email: "Обязательное поле!",
        }));
      } else if (!/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i.test(target.value)) {
        setErr((state) => ({
          ...state,
          email: "Некорректный email!",
        }));
      } else {
        setErr((state) => ({
          ...state,
          email: "",
        }));
      }
    }

    if (target.name === "password") {
      if (!target.value) {
        setErr((state) => ({
          ...state,
          password: "Обязательное поле!",
        }));
      } else {
        setErr((state) => ({
          ...state,
          password: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setFetchError(true);
    }
  };
  return (
    <div className={styles.login__container}>
      <div className={styles.login__back_image}>
        <div></div>
        <img src={backgroundImage} alt="background" />
      </div>
      <div className={styles.login__wrapper}>
        <div className={styles.login__logo_wrapper}>
          <span className={styles.login__logo}>Chatix</span>
        </div>
        <div className={styles.login__inner_wrapper}>
          <span className={styles.login__title}>Вход</span>
          <form className={styles.login__form} onSubmit={handleSubmit}>
            <input
              className={styles.login__form_input}
              style={
                err.email
                  ? { border: "1px solid red", backgroundColor: "#ffe1e1" }
                  : null
              }
              type="email"
              name="email"
              placeholder="Эл. почта"
              required
              value={email}
              onChange={handleChange}
            />
            <input
              className={styles.login__form_input}
              style={
                err.password
                  ? { border: "1px solid red", backgroundColor: "#ffe1e1" }
                  : null
              }
              type="password"
              name="password"
              placeholder="Пароль"
              required
              value={password}
              onChange={handleChange}
            />
            <button
              className={styles.login__form_button}
              disabled={err.email || err.password}
            >
              {loading ? <PulseLoader size="6" color="#555555" /> : "Войти"}
            </button>
            {fetchError && (
              <span className={styles.login__error}>
                Неправильные данные для входа
              </span>
            )}
          </form>
          <p className={styles.login__redirect}>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
