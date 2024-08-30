import express from "express";
import bodyParser from "body-parser";
import measureRoutes from "./routes/";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", measureRoutes);

// Rota raiz  
app.get('/', (req, res) => {  
  res.send('API está funcionando!');  
}); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
