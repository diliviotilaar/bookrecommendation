import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerLogin() {
  
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handlerLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.error || "Login gagal");
        return;
      }

      // Clear old user data first
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Simpan token + userId + username
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.username); // from database

      navigate("/account/books");

    } catch (err) {
      setMessage("Gagal konek ke server");
    }
  };


  return {
    loginData,
    setLoginData,
    message,
    setMessage,
    handlerLogin
  };
}
