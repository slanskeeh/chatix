import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatix</span>
        <span className="title">Вход</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Эл. почта" />
          <input type="password" placeholder="Пароль" />
          <button>Sign in</button>
          {err && <span>Что-то пошло не так</span>}
        </form>
        <p>
          Нет аккаунта? <Link to="/register">Зарегестрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
