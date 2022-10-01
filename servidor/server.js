const express = require("express");
const cors = require("cors");
const path = require("path");
const { readFileJson } = require("./src/readFileJson.js");
const { writeFileJson } = require("./src/writeFileJson.js");

const port = process.env.PORT || 3003;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/beneficiario/criar", function (req, res) {
  try {
    const { quantidade, idade, nome, plano } = req.body;

    if (!quantidade || !plano) {
      res.statusCode = 404;
      throw new Error(
        "O valor de quantidade ou plano devem ser maior que zero."
      );
    }

    if (!idade.length || !nome.length || !nome[0] || !idade[0]) {
      res.statusCode = 404;
      throw new Error("Valores de idade ou nome devem ser enviados");
    }

    const plans = readFileJson(
      path.resolve(__dirname, "./src/jsons/plans.json")
    );

    const prices = readFileJson(
      path.resolve(__dirname, "./src/jsons/prices.json")
    );

    // verifica se o plano existe
    const planExist = plans.find((plan) => {
      return plan.codigo === plano;
    });

    if (!planExist) {
      res.statusCode = 404;
      throw new Error(`Plano com numero ' ${plano} ' não existente`);
    }

    // escreve o json
    writeFileJson(path.resolve(__dirname, "./beneficiarios.json"), req.body);

    // verifica os precos a partir do plano
    const findPriceByPlan = prices.filter((price) => {
      if (price.codigo === plano) {
        return price;
      }
    });

    const findPriceByQtd = () => {
      const maxLife = findPriceByPlan.reduce(function (prev, current) {
        return prev.minimo_vidas > current.minimo_vidas ? prev : current;
      });

      const minLife = findPriceByPlan.reduce(function (prev, current) {
        return prev.minimo_vidas < current.minimo_vidas ? prev : current;
      });

      if (
        quantidade >= minLife.minimo_vidas &&
        quantidade < maxLife.minimo_vidas
      ) {
        return minLife;
      }

      if (quantidade >= maxLife.minimo_vidas) {
        return maxLife;
      }
    };

    // verifica a idade e preco dos planos
    const priceByBeneficiario = idade.map((idade) => {
      if (idade > 0 && idade < 18) {
        return { preco: findPriceByQtd().faixa1, idade: idade };
      } else if (idade > 18 && idade < 40) {
        return { preco: findPriceByQtd().faixa2, idade: idade };
      } else {
        return { preco: findPriceByQtd().faixa3, idade: idade };
      }
    });

    let totalPrice = 0;
    for (const total of priceByBeneficiario) {
      totalPrice += total.preco;
    }

    const proposta = {
      informacoesBeneficiarios: { quantidade, idade, nome },
      plano: planExist,
      precos: {
        precoPorBeneficiario: priceByBeneficiario,
        precoTotal: totalPrice,
      },
    };

    writeFileJson(path.resolve(__dirname, "./proposta.json"), proposta);

    res.status(200).send({ priceByBeneficiario, totalPrice });
  } catch (error) {
    res.status(res.statusCode || 500).send({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running in port http://localhost:${port}`);
});
