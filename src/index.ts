import express from "express";
import bodyParser from "body-parser";
import uploadRoute from "./routes/uploadRoute";
import confirmRoute from "./routes/confirmRoute";
import listRoute from "./routes/listRoute";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(uploadRoute);
app.use(confirmRoute);
app.use(listRoute);

// Rota raiz  
app.get('/', (req, res) => {  
  res.send('API está funcionando!');  
}); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
