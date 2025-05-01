const express = require("express");
const Disciplina = require("../models/DisciplinaSchema");
const router = express.Router();

// Criar uma nova disciplina
router.post("/", async (req, res) => {
  try {
    const disciplina = await Disciplina.create(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todas as disciplinas
router.get("/", async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate("professor");
    res.status(200).json({
      success: true,
      message: "Lista de disciplinas obtida com sucesso",
      data: disciplinas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter disciplinas",
      error: error.message,
    });
  }
});

// Atualizar uma disciplina
router.put("/:id", async (req, res) => {
  try {
    const disciplina = await Disciplina.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar uma disciplina
router.delete("/:id", async (req, res) => {
  try {
    await Disciplina.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Disciplina deletada com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
