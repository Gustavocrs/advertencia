const mongoose = require("mongoose");

const AdvertenciaSchema = new mongoose.Schema({
  turma: {type: String, required: true}, // Turma do aluno
  aluno: {type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true}, // Relacionamento com Aluno
  servidor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servidor",
    required: true,
  }, // Relacionamento com Servidor
  cargo: {type: String, required: true}, // Cargo do servidor
  data: {type: Date, default: Date.now, required: true}, // Data da advertência
  motivo: {type: String, required: true}, // Motivo da advertência
  acaoEsperada: {type: String, required: true}, // Ação esperada do responsável
  dataComparecimento: {type: Date}, // Data de comparecimento
});

module.exports = mongoose.model("Advertencia", AdvertenciaSchema);
