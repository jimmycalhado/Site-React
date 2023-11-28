import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const url = "http://localhost:8080/usuarios/login";

function VerificaUsuario() {
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, senha } = event.target.elements;

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Request-Private-Network": true,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          senha: senha.value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErro(error.message || "Erro na autenticação");
      } else {
        console.log("Login successful");
        setErro("");
        // Redirect to /home on successful login
        navigate("/home");
      }
    } catch (err) {
      console.log("erro", err);
    }
  };

  return (
    <div>
      {erro && <div className="erro">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="senha" placeholder="Senha"/>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default VerificaUsuario;
