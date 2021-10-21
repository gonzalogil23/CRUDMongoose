let mongoose = require("mongoose");
let { Mensajes } = require("../models/mensajes.js");

CRUDmensajes();

async function CRUDmensajes() {
  try {
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos...");

    let mensajes = await Mensajes.find({}).sort({ fecha: 1 });
    console.log(mensajes);

    let mensajeActualizado = await Mensajes.updateOne(
      { texto: "hola" },
      { $set: { texto: "HOLA CON MAYUSCULA" } }
    );
    console.log(mensajeActualizado);

    await Mensajes.deleteOne({ texto: "borrar este mensaje" });
    console.log(mensajes);
    await mongoose.connection.close();
  } catch (error) {
    throw `Error: ${error}`;
  }
}
