import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import backgroundImage from "../../img/login_back.jpg";
import { PulseLoader } from "react-spinners";

import styles from "./Register.module.sass";

const Register = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const target = e.target;
    if (target.name !== "file") validation(target);

    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      case "name":
        setName(target.value);
        break;
      case "file":
        setFile(URL.createObjectURL(target.files[0]));
        setImage(target.files[0]);
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

    if (target.name === "name") {
      if (!target.value) {
        setErr((state) => ({
          ...state,
          name: "Обязательное поле!",
        }));
      } else {
        setErr((state) => ({
          ...state,
          name: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Создаем пользователя
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Создание уникального названия картинки
      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Обновить профиль
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            //Создать пользователя на firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });

            //Создать пустые чаты на firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false);
            navigate("/");
          } catch (err) {
            console.log(err);
            setLoading(false);
            setFetchError(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.register__container}>
      <div className={styles.register__back_image}>
        <div></div>
        <img src={backgroundImage} alt="background" />
      </div>
      <div className={styles.register__wrapper}>
        <div className={styles.register__logo_wrapper}>
          <span className={styles.register__logo}>Chatix</span>
        </div>
        <div className={styles.register__inner_wrapper}>
          <span className={styles.register__title}>Регистрация</span>
          <form onSubmit={handleSubmit} className={styles.register__form}>
            <input
              required
              type="text"
              name="name"
              placeholder="Имя"
              value={name}
              onChange={handleChange}
              className={styles.register__form_input}
              style={
                err.name
                  ? { border: "1px solid red", backgroundColor: "#ffe1e1" }
                  : null
              }
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Эл. почта"
              value={email}
              onChange={handleChange}
              className={styles.register__form_input}
              style={
                err.email
                  ? { border: "1px solid red", backgroundColor: "#ffe1e1" }
                  : null
              }
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={handleChange}
              className={styles.register__form_input}
              style={
                err.password
                  ? { border: "1px solid red", backgroundColor: "#ffe1e1" }
                  : null
              }
            />
            <div className={styles.register__form__file_wrapper}>
              <input
                required
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <span className={styles.register__form_button_avatar}>
                  Добавить аватар
                </span>
              </label>
              <div className={styles.register__form__file_wrapper_img}>
                {file && <img src={file} alt="avatar" />}
              </div>
            </div>
            <button
              className={styles.register__form_button}
              disabled={
                !email ||
                !password ||
                !name ||
                !file ||
                err.email ||
                err.password ||
                err.name
              }
            >
              {loading ? (
                <PulseLoader size="6" color="#555555" />
              ) : (
                "Зарегистрироваться"
              )}
            </button>
            {fetchError && (
              <span className={styles.login__error}>
                Не удалось зарегистрироваться
              </span>
            )}
          </form>
          <p className={styles.register__redirect}>
            Есть аккаунт? <Link to="/register">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
