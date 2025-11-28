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

      // Simpan token
      localStorage.setItem("token", data.token);

      setMessage("Login sukses!");
      navigate("/home");

      // reset input
      setLoginData({ username: "", password: "" });

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
