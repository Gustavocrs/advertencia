const mongoose = require("mongoose");

const AdvertenciaSchema = new mongoose.Schema({
  aluno: {type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true}, // Relacionamento com Aluno
  servidor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servidor",
    required: true,
  }, // Relacionamento com Servidor
  data: {type: Date, default: Date.now},
  descricao: {type: String, required: true},
  tipo: {type: String, enum: ["leve", "moderada", "grave"], required: true},
});

module.exports = mongoose.model("Advertencia", AdvertenciaSchema);
