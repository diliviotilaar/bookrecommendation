import { useState } from "react";

export default function useHandlerRegistration() {
  const [isActive, setIsActive] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    age: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupData.username,
          password: signupData.password,
          age: Number(signupData.age),
          location: signupData.location,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Register gagal");
        return;
      }

      setMessage("Register sukses!");
      setSignupData({ username: "", password: "", age: "", location: "" });
      setIsActive(false);

    } catch (err) {
      setMessage("Gagal konek ke server");
    }
  };

  return {
    isActive,
    setIsActive,
    signupData,
    setSignupData,
    message,        // ⬅️ INI WAJIB ADA
    handleRegister,
  };
}
