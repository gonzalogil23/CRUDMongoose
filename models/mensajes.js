let mongoose = require("mongoose");

const mensajesCollection = "mensajes";

const MensajesSchema = mongoose.Schema({
  autor: { type: String, require: true, minLength: 3, maxLenghth: 20 },
  texto: { type: String, require: true, minLength: 3, maxLenghth: 25 },
  fecha: { type: Date, require: true },
});

module.exports = {
  Mensajes: mongoose.model(mensajesCollection, MensajesSchema),
};
