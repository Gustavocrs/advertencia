const express = require("express");
const Turma = require("../models/TurmaSchema");
const router = express.Router();

// Criar uma nova turma
router.post("/", async (req, res) => {
  try {
    const turma = await Turma.create(req.body);
    res.status(201).json(turma);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todas as turmas
router.get("/", async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate("alunos")
      .populate("disciplinas");
    res.status(200).json({
      success: true,
      message: "Lista de turmas obtida com sucesso",
      data: turmas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter turmas",
      error: error.message,
    });
  }
});

// Atualizar uma turma
router.put("/:id", async (req, res) => {
  try {
    const turma = await Turma.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(turma);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar uma turma
router.delete("/:id", async (req, res) => {
  try {
    await Turma.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Turma deletada com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
