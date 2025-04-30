const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  matricula: {type: String, required: true},
  turma: {type: String, required: true},
  dataNascimento: {type: Date, required: true},
  endereco: {type: String, required: true},
  numero: {type: Number, required: true},
  bairro: {type: String, required: true},
  cidade: {type: String, required: true},
  estado: {type: String, required: true},
  celular: {type: String, required: true},
  email: {type: String, required: true},
  responsavel: {type: mongoose.Schema.Types.ObjectId, ref: "Responsavel"}, // Relacionamento com Responsável
});

module.exports = mongoose.model("Aluno", AlunoSchema);
