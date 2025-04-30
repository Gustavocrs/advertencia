const mongoose = require("mongoose");

const TurmaSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  ano: {type: Number, required: true},
  alunos: [{type: mongoose.Schema.Types.ObjectId, ref: "Aluno"}], // Relacionamento com Aluno
  disciplinas: [{type: mongoose.Schema.Types.ObjectId, ref: "Disciplina"}], // Relacionamento com Disciplina
});

module.exports = mongoose.model("Turma", TurmaSchema);
