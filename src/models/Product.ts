// Modelo: descreve o formato dos dados que circulam entre as camadas.
export interface Product {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

// Dados necessários para cadastrar um produto (o id é gerado pelo banco).
export type NovoProduto = Omit<Product, "id">;
