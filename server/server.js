const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/project.route.js");

const port = process.env.PORT || 3000; 
// const corsOptions = {
//   origin: "https://todo-frontend-ks86.onrender.com",
// };

// app.use(cors(corsOptions));
app.use(cors());
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
    app.listen(port, () => {
      console.log("Servidor corriendo...");
    });
  })
  .catch(()=>{
    console.log("Error al conectar a la base de datos");
  })
