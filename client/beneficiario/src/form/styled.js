import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 1px;
  align-items: center;
  width: 100%;

   form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    height: 50%;
  } 
  p {
    font-size: 2rem;
  }
`;
export const FormDiv = styled.div`
  margin: 30px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

export const ButtonStyled = styled(Button)`
  && {
    color: #000;
    width: 100%;
    background-color: #5f9ea0;
    margin-top: 5px;
  }
`;
export const FormQtd = styled(FormControl)`
  && {
    width: 100%;
    background-color: lightblue;
  }
`;

export const InputMaterial = styled(TextField)`
  width: 100%;
`;
