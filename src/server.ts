import express from "express";
import rotas from "./presentation/routes";
import { iniciarBanco } from "./data/database";
import { inserirProdutosIniciais } from "./data/seed";

const app = express();
app.use(express.json());
app.use(rotas);

const PORTA = 3000;

async function iniciar(): Promise<void> {
  try {
    await iniciarBanco();            // 1. conecta e cria a tabela, se necessário
    await inserirProdutosIniciais(); // 2. insere os produtos se o banco estiver vazio
    app.listen(PORTA, () => console.log(`API rodando em http://localhost:${PORTA}`)); // 3. sobe o Express
  } catch (erro) {
    console.error("Falha ao iniciar a aplicação:", erro);
    process.exit(1);
  }
}

iniciar();
