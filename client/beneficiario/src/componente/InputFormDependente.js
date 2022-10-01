import { ButtonStyled, InputMaterial } from "../form/styled";

export const InputFormDependente = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmitFormDependente}>
      <h2>Cadastro dos dependentes</h2>
        <InputMaterial
          placeholder="Digite seu nome"
          type={"text"}
          value={props.dependente.nome}
          onChange={(e) => props.onChangeNovoDependente(e,props.index)}
        />
      

        <ButtonStyled onClick={props.enviarDados}>Enviar</ButtonStyled>
      </form>
    </>
  );
};
