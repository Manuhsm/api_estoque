import { Router } from "express";
import { ProductController } from "./ProductController";

const rotas = Router();
const controller = new ProductController();

rotas.get("/products", controller.listar);
rotas.post("/products", controller.cadastrar);

export default rotas;
