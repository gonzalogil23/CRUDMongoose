let mongoose = require("mongoose");
let { Productos } = require("../models/productos.js");

CRUDproductos();

async function CRUDproductos() {
  try {
    const URI = "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos...");
    let products = [
      {
        title: "SmartTV",
        price: 70000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/essential-web-2/50/tv-screen-smart-widescreen-watch-128.png",
      },
      {
        title: "Aire Acondicionado",
        price: 53000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/32/Appliances-19-128.png",
      },
      {
        title: "Celular Samsung",
        price: 57000,
        thumbnail:
          "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/32/Appliances-06-128.png",
      },
    ];
    await Productos.insertMany(products, (error) => {
      if (error) {
        throw ` Error al grabar productos ${error}`;
      } else {
        console.log(`Productos grabados...`);
      }
    });
    let productos = await Productos.find({}).sort({ price: 1 });
    console.log(productos);

    let productoActualizado = await Productos.updateOne(
      { title: "Aire Acondicionado" },
      { price: 62000 }
    );
    console.log(`Producto actualizado: ${productoActualizado}`);

    let productoNuevo = await Productos.create({
      title: "Monitor",
      price: 42000,
      thumbnail:
        "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/32/Appliances-09-128.png",
    });
    console.log(productoNuevo);

    await Productos.deleteOne({ title: "Monitor" });
    console.log(`Producto borrado. Lista actualizada: ${products}`);
    await mongoose.connection.close();
  } catch (error) {
    throw `Error: ${error}`;
  }
}
