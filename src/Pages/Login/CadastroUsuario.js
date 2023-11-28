import React, { useState } from "react";

const url = "http://localhost:8080/usuarios";

function CadastroUsuario() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = (event) => {
    event.preventDefault();

    const body = {
      username,
      email,
      senha: senha,
    };

    fazPost(body);
  };

  function fazPost(body) {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Request-Private-Network": true,
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Email Inválido') {
          setErro("Email Inválido");
        } else {
          console.log("ok");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="cadastro-user">
        {erro && <div className="erro">{erro}</div>}
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            id="username"
            placeholder="Nome"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="E-mail"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            id="senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;
