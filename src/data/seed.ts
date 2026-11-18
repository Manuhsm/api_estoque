import { ProductRepository } from "./ProductRepository";
import { NovoProduto } from "../models/Product";

const produtosIniciais: NovoProduto[] = [
  { nome: "Teclado Mecânico", preco: 249.9, quantidade: 40 },
  { nome: "Mouse Gamer", preco: 129.9, quantidade: 60 },
  { nome: "Monitor 24 Polegadas", preco: 799.0, quantidade: 25 },
  { nome: "Monitor 27 Polegadas", preco: 1199.0, quantidade: 15 },
  { nome: "Notebook Core i5", preco: 3499.0, quantidade: 12 },
  { nome: "Notebook Ryzen 7", preco: 4999.0, quantidade: 8 },
  { nome: "Headset Gamer", preco: 199.9, quantidade: 35 },
  { nome: "Webcam Full HD", preco: 189.9, quantidade: 30 },
  { nome: "SSD 480GB", preco: 229.9, quantidade: 50 },
  { nome: "SSD NVMe 1TB", preco: 449.9, quantidade: 28 },
  { nome: "HD Externo 1TB", preco: 359.9, quantidade: 22 },
  { nome: "HD Externo 2TB", preco: 529.9, quantidade: 18 },
  { nome: "Memória RAM 8GB DDR4", preco: 169.9, quantidade: 70 },
  { nome: "Memória RAM 16GB DDR4", preco: 299.9, quantidade: 45 },
  { nome: "Processador Ryzen 5", preco: 899.0, quantidade: 20 },
  { nome: "Processador Core i7", preco: 1799.0, quantidade: 10 },
  { nome: "Placa de Vídeo RTX 4060", preco: 2299.0, quantidade: 9 },
  { nome: "Placa de Vídeo RX 6600", preco: 1699.0, quantidade: 11 },
  { nome: "Placa-Mãe B550", preco: 749.9, quantidade: 17 },
  { nome: "Placa-Mãe H610", preco: 529.9, quantidade: 21 },
  { nome: "Fonte 500W", preco: 279.9, quantidade: 33 },
  { nome: "Fonte 750W 80 Plus Gold", preco: 579.9, quantidade: 14 },
  { nome: "Gabinete Gamer", preco: 349.9, quantidade: 26 },
  { nome: "Roteador Wi-Fi 6", preco: 399.9, quantidade: 32 },
  { nome: "Impressora Multifuncional", preco: 899.0, quantidade: 16 },
  { nome: "Smartphone 128GB", preco: 1599.0, quantidade: 38 },
  { nome: "Tablet 10 Polegadas", preco: 1199.0, quantidade: 19 },
  { nome: "Cooler para Processador", preco: 139.9, quantidade: 44 },
  { nome: "Pen Drive 64GB", preco: 49.9, quantidade: 120 },
  { nome: "Hub USB 3.0", preco: 79.9, quantidade: 55 },
  { nome: "Mousepad Grande", preco: 59.9, quantidade: 80 },
  { nome: "Cabo HDMI 2 metros", preco: 29.9, quantidade: 150 },
];

// Insere os produtos iniciais somente se a tabela estiver vazia.
// Assim, reiniciar o servidor não duplica os registros.
export async function inserirProdutosIniciais(): Promise<void> {
  const repositorio = new ProductRepository();
  const total = await repositorio.contar();

  if (total > 0) {
    console.log(`Seed ignorado: já existem ${total} produtos no banco.`);
    return;
  }

  for (const produto of produtosIniciais) {
    await repositorio.criar(produto);
  }
  console.log(`Seed concluído: ${produtosIniciais.length} produtos inseridos.`);
}
