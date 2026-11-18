import dotenv from "dotenv";
import { Pool } from "pg";

// Carrega as variáveis do arquivo .env (a senha nunca fica escrita no código).
dotenv.config();

// Pool de conexões com o PostgreSQL.
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conecta ao PostgreSQL e cria a tabela products caso ela ainda não exista.
export async function iniciarBanco(): Promise<void> {
  const conexao = await pool.connect(); // falha aqui se o banco estiver inacessível
  try {
    await conexao.query(`
      CREATE TABLE IF NOT EXISTS products (
        id         SERIAL PRIMARY KEY,
        nome       VARCHAR(150) NOT NULL,
        preco      NUMERIC(10,2) NOT NULL,
        quantidade INTEGER NOT NULL
      )
    `);
    console.log("Conectado ao PostgreSQL. Tabela products pronta.");
  } finally {
    conexao.release(); // devolve a conexão ao pool
  }
}
