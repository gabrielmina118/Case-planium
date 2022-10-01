import React from "react";
import { Form } from "./form/Form.js";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;

  h2{
    text-align: center;
  }
`
function App() {
  return (
    <Main>
      <Form />
    </Main>
  );
}

export default App;
