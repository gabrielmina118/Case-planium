import { ButtonStyled, InputMaterial } from "../form/styled"

export const InputForm = (props) =>{
    return(
        <form onSubmit={props.onsubmitForm}>
          <InputMaterial
            placeholder="Digite seu nome"
            type={"text"}
            value={props.nome}
            onChange={(e) => props.setNome(e.target.value)}
          />
          <InputMaterial
            placeholder="Digite sua idade"
            type={"number"}
            value={props.idade}
            onChange={(e) => props.setIdade(e.target.value)}
          />
          <InputMaterial
            placeholder="Digite a quantidade de dependentes"
            type={"number"}
            value={props.quantidade}
            onChange={(e) => props.setQuantidade(e.target.value)}
          />
          <InputMaterial
            placeholder="Digite o numero do plano"
            type={"number"}
            value={props.plano}
            onChange={(e) => props.setPlano(e.target.value)}
          />
          <ButtonStyled type="submit">Enviar</ButtonStyled>
        </form>
    )
}