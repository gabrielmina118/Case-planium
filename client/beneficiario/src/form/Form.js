import React, { useState } from "react";
import axios from "axios";
import { ButtonStyled, Main } from "./styled";
import { InputForm } from "../componente/InputForm";
import { InputFormDependente } from "../componente/InputFormDependente";

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
  const [idade, setIdade] = useState();
  const [plano, setPlano] = useState();
  const [novoDependente, setNovoDependente] = useState([]);

  const onsubmitForm = (event) => {
    event.preventDefault();
    enviarDados();
  };

  const onSubmitFormDependente = (event) => {
    event.preventDefault();
  };

  const enviarDados = async () => {
    // unir 2 arrays
    const arrayNomes = [nome].concat(novoDependente);

    const body = {
      nome: arrayNomes,
      idade: [Number(idade)],
      quantidade: Number(arrayNomes.length),
      plano: Number(plano),
    };

    console.log(body);
    await axios
      .post("http://localhost:3003/beneficiario/criar", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const adicionaNovoCampo = () => {
    setNovoDependente([...novoDependente, ""]);
  };

  const onChangeNovoDependente = (e, index) => {
    novoDependente[index] = e.target.value;
    setNovoDependente([...novoDependente]);
  };

  return (
    <>
      <h2>CADASTRO DE BENEFICIÁRIOS</h2>
      <ButtonStyled onClick={adicionaNovoCampo}>
        Adicinar um dependente
      </ButtonStyled>
      <Main>
        <InputForm
          enviarDados={enviarDados}
          onsubmitForm={onsubmitForm}
          nome={nome}
          idade={idade}
          plano={plano}
          setNome={setNome}
          setIdade={setIdade}
          setPlano={setPlano}
        />
        {novoDependente.length > 0 ? (
          novoDependente.map((dependente, index) => {
            return (
              <InputFormDependente
                onSubmitFormDependente={onSubmitFormDependente}
                dependente={dependente}
                index={index}
                onChangeNovoDependente={onChangeNovoDependente}
                enviarDados={enviarDados}
              />
            );
          })
        ) : (
          <p>Sem dependente</p>
        )}
      </Main>
    </>
  );
};
