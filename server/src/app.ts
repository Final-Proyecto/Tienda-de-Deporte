import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pagina de Inicio de la API");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
