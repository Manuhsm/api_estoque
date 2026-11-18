import { pool } from "./database";
import { NovoProduto, Product } from "../models/Product";

// Repository: ÚNICA camada que conversa com o PostgreSQL (executa o SQL).
export class ProductRepository {
  // O pg devolve NUMERIC como texto, então convertemos o preço para número.
  private converterLinha(linha: any): Product {
    return {
      id: linha.id,
      nome: linha.nome,
      preco: Number(linha.preco),
      quantidade: linha.quantidade,
    };
  }

  async buscarTodos(): Promise<Product[]> {
    const resultado = await pool.query(
      "SELECT id, nome, preco, quantidade FROM products ORDER BY id"
    );
    return resultado.rows.map((linha) => this.converterLinha(linha));
  }

  async criar(produto: NovoProduto): Promise<Product> {
    const resultado = await pool.query(
      `INSERT INTO products (nome, preco, quantidade)
       VALUES ($1, $2, $3)
       RETURNING id, nome, preco, quantidade`,
      [produto.nome, produto.preco, produto.quantidade] // parâmetros evitam SQL Injection
    );
    return this.converterLinha(resultado.rows[0]);
  }

  async contar(): Promise<number> {
    const resultado = await pool.query("SELECT COUNT(*) AS total FROM products");
    return Number(resultado.rows[0].total);
  }
}
