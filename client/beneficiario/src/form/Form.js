import React, { useState } from "react";
import axios from "axios";
import { Main } from "./styled";
import { InputForm } from "../componente/InputForm";

/*
  {
    "quantidade": 2,
    "idade": [16, 15],
    "nome": ["Janaylla", "larissa"],
    "plano": 6
}
  
  */

export const Form = () => {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState([]);
  const [quantidade, setQuantidade] = useState();
  const [plano, setPlano] = useState();

  const onsubmitForm = (event) => {
    event.preventDefault();
    enviarDados();
  };

  const enviarDados = async () => {
    const arrayNomes = [nome];

    const body = {
      nome: arrayNomes,
      idade: [Number(idade)],
      quantidade: Number(quantidade),
      plano: Number(plano),
    };

    console.log(body);
    
    await axios
      .post("http://localhost:3003/beneficiario/criar", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
 
  return (
    <Main>
      <h2>CADASTRO DE BENEFICIÁRIOS</h2>
        <InputForm
          onsubmitForm={onsubmitForm}
          nome={nome}
          idade={idade}
          quantidade={quantidade}
          plano={plano}
          setNome={setNome}
          setIdade={setIdade}
          setQuantidade={setQuantidade}
          setPlano={setPlano}
        />
    </Main>
  );
};
