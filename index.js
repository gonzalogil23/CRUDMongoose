const express = require("express");
let mongoose = require("mongoose");
let { Mensajes } = require("./models/mensajes.js");
let { productosRouter } = require("./routes/productos.js");
let { Productos } = require("./models/productos.js");

const app = express();
const PORT = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use("/productos", productosRouter);

app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

http.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

const mensajes = [];

ConectandoaBD();

async function ConectandoaBD() {
  try {
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Productos.deleteMany({});
    await Productos.insertMany(this.products, (error) => {
      if (error) {
        throw ` Error al grabar productos ${error}`;
      } else {
        console.log(`Productos grabados...`);
      }
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
    return mensajeNuevo;
  });
});
