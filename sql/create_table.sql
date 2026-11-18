-- Script de criação da tabela (a API também executa isso ao iniciar)
CREATE TABLE IF NOT EXISTS products (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(150) NOT NULL,
  preco      NUMERIC(10,2) NOT NULL,
  quantidade INTEGER NOT NULL
);
