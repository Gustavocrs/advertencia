const express = require("express");
const Aluno = require("../models/AlunoSchema");
const router = express.Router();

// Criar um novo aluno
router.post("/", async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todos os alunos
router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json({
      success: true,
      message: "Lista de alunos obtida com sucesso",
      data: alunos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter alunos",
      error: error.message,
    });
  }
});

// Atualizar um aluno
router.put("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(aluno);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar um aluno
router.delete("/:id", async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Aluno deletado com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
