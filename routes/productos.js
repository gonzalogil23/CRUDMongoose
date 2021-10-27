const express = require("express");

const {
  getAll,
  getById,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productos.js");

const productosRouter = express.Router();

productosRouter
  .get("/listar", getAll)
  .get("/:id", getById)
  .post("/guardar", saveProduct)
  .put("/actualizar/:id", updateProduct)
  .delete("/borrar/:id", deleteProduct);

module.exports = {
  productosRouter,
};
