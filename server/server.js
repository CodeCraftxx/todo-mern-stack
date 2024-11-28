const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/project.route.js");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Importar rutas
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor!!");
});

mongoose
  .connect(
    "mongodb+srv://theodore0510:Angel1t0@backenddb.kugmp.mongodb.net/PROJECT-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(3001, () => {
      console.log("Servidor corriendo en el puerto 3001");
    });
  })
  .catch(()=>{
    console.log("Error al conectar a la base de datos");
  })
