const mongoose = require("mongoose");

const DisciplinaSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  codigo: {type: String, required: true},
  cargaHoraria: {type: Number, required: true},
  professor: {type: mongoose.Schema.Types.ObjectId, ref: "Servidor"}, // Relacionamento com Servidor
});

module.exports = mongoose.model("Disciplina", DisciplinaSchema);
