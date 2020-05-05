import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() =>{
      api.get("/repositories").then(res =>{
        setRepositories(res.data)
      });
  }, []);

  async function handleAddRepository() {
    // TODO
    const res = await api.post("/repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com",
      techs: ""
    })

    const repository = res.data;

    setRepositories([ ...repositories, repository ])
  }

  async function handleRemoveRepository(id, index) {
    // TODO
    await api.delete("/repositories/" + id)

    //Remove o elemento do array
    repositories.splice(index, 1)

    //Atualizar o estado
    setRepositories([ ...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => 
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id, index)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
