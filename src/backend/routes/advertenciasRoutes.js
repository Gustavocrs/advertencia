const express = require("express");
const Advertencia = require("../models/AdvertenciaSchema");
const router = express.Router();

// Criar uma nova advertência
router.post("/", async (req, res) => {
  try {
    const advertencia = await Advertencia.create(req.body);
    res.status(201).json(advertencia);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todas as advertências
router.get("/", async (req, res) => {
  try {
    const advertencias = await Advertencia.find()
      .populate("aluno")
      .populate("servidor");
    res.status(200).json({
      success: true,
      message: "Lista de advertências obtida com sucesso",
      data: advertencias,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter advertências",
      error: error.message,
    });
  }
});

// Atualizar uma advertência
router.put("/:id", async (req, res) => {
  try {
    const advertencia = await Advertencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(advertencia);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar uma advertência
router.delete("/:id", async (req, res) => {
  try {
    await Advertencia.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Advertência deletada com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
