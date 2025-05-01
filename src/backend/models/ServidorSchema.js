const mongoose = require("mongoose");

const ServidorSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  cpf: {type: String, required: true},
  endereco: {type: String, required: true},
  numero: {type: Number, required: true},
  bairro: {type: String, required: true},
  cidade: {type: String, required: true},
  estado: {type: String, required: true},
  celular: {type: String, required: true},
  email: {type: String, required: true},
  disciplina: {type: String, required: true},
  matricula: {type: String, required: true},
  cargo: {type: String, required: true},
});

module.exports = mongoose.model("Servidor", ServidorSchema);
