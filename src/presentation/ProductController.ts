import { Request, Response } from "express";
import { ProductService, ErroDeValidacao } from "../business/ProductService";

// Controller: recebe a requisição HTTP, chama o Service e devolve a resposta.
export class ProductController {
  constructor(private servico: ProductService = new ProductService()) {}

  listar = async (_req: Request, res: Response): Promise<void> => {
    try {
      const produtos = await this.servico.listarProdutos();
      res.status(200).json(produtos);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  };

  cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const produto = await this.servico.cadastrarProduto(req.body);
      res.status(201).json(produto);
    } catch (erro) {
      if (erro instanceof ErroDeValidacao) {
        res.status(400).json({ erro: erro.message });
        return;
      }
      console.error(erro);
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  };
}
