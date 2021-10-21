const express = require("express");
let mongoose = require("mongoose");
let { Mensajes } = require("./models/mensajes.js");

const app = express();
const PORT = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();
app.use("/", router);

class ProductService {
  getAll(req, res) {
    if (!products) {
      res.json({ error: "no hay productos cargados" });
    } else {
      res.json(products);
      console.log(products);
    }
  }
  getById(req, res) {
    const { id } = req.params;
    const producto = products.find((product) => product.id == id);
    if (!producto) {
      res.json({ error: "producto no encontrado" });
    } else {
      res.json(producto);
    }
  }
  saveProduct(req, res) {
    const newProduct = {
      id: products.length + 1,
      ...req.body,
    };
    products.push(newProduct);
    res.redirect("/");
  }
  updateProduct(req, res) {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const product = products.find((product) => product.id == id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    (product.title = title),
      (product.price = price),
      (product.thumbnail = thumbnail);

    res.status(200).json(product);
  }
  deleteProduct(req, res) {
    const { id } = req.params;
    const product = products.find((product) => product.id == id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    const index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
    res.status(200).end();
  }
}
const servicio = new ProductService();

app.get("/productos/listar", (req, res) => {
  servicio.getAll(req, res);
});

app.get("/productos/:id", (req, res) => {
  servicio.getById(req, res);
});
app.post("/productos/guardar", (req, res) => {
  servicio.saveProduct(req, res);
});
app.put("/productos/actualizar/:id", (req, res) => {
  servicio.updateProduct(req, res);
});
app.delete("/productos/borrar/:id", (req, res) => {
  servicio.deleteProduct(req, res);
});

http.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

const mensajes = [];

CreateMensajes();

async function CreateMensajes() {
  try {
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

io.on("connection", (socket) => {
  console.log("conectado!");
  socket.emit("mensajes", mensajes);
  socket.on("nuevo", async (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
    let { autor, texto, fecha } = data;
    let mensajeNuevo = await Mensajes.create({
      autor: autor,
      texto: texto,
      fecha: fecha,
    });
    console.log(texto);
    console.log(mensajeNuevo);
  });
});
