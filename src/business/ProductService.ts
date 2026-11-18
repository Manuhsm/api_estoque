import { ProductRepository } from "../data/ProductRepository";
import { NovoProduto, Product } from "../models/Product";

// Erro específico para dados inválidos (o Controller converte em HTTP 400).
export class ErroDeValidacao extends Error {}

// Service: contém as REGRAS DE NEGÓCIO. Não conhece HTTP nem SQL.
export class ProductService {
  constructor(private repositorio: ProductRepository = new ProductRepository()) {}

  async listarProdutos(): Promise<Product[]> {
    return this.repositorio.buscarTodos();
  }

  async cadastrarProduto(dados: any): Promise<Product> {
    const nome = typeof dados?.nome === "string" ? dados.nome.trim() : "";
    const preco = dados?.preco;
    const quantidade = dados?.quantidade;

    if (!nome) {
      throw new ErroDeValidacao("O nome é obrigatório.");
    }
    if (nome.length > 150) {
      throw new ErroDeValidacao("O nome deve ter no máximo 150 caracteres.");
    }
    if (typeof preco !== "number" || !Number.isFinite(preco) || preco <= 0) {
      throw new ErroDeValidacao("O preço deve ser um número maior que zero.");
    }
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new ErroDeValidacao("A quantidade deve ser um inteiro maior ou igual a zero.");
    }

    const novoProduto: NovoProduto = { nome, preco, quantidade };
    return this.repositorio.criar(novoProduto);
  }
}
