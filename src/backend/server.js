const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const servidorRoutes = require("./routes/servidorRoutes");
const responsaveisRoutes = require("./routes/responsaveisRoutes");
const advertenciasRoutes = require("./routes/advertenciasRoutes");
const disciplinasRoutes = require("./routes/disciplinasRoutes");
const turmasRoutes = require("./routes/turmasRoutes");
const alunosRoutes = require("./routes/alunosRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/servidores", servidorRoutes);
app.use("/api/alunos", alunosRoutes);
app.use("/api/responsaveis", responsaveisRoutes);
app.use("/api/advertencias", advertenciasRoutes);
app.use("/api/disciplinas", disciplinasRoutes);
app.use("/api/turmas", turmasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
