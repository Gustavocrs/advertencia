const express = require("express");
const Responsavel = require("../models/ResponsavelSchema");
const router = express.Router();

// Criar um novo responsável
router.post("/", async (req, res) => {
  try {
    const responsavel = await Responsavel.create(req.body);
    res.status(201).json(responsavel);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todos os responsáveis
router.get("/", async (req, res) => {
  try {
    const responsaveis = await Responsavel.find();
    res.status(200).json({
      success: true,
      message: "Lista de responsáveis obtida com sucesso",
      data: responsaveis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter responsáveis",
      error: error.message,
    });
  }
});

// Atualizar um responsável
router.put("/:id", async (req, res) => {
  try {
    const responsavel = await Responsavel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(responsavel);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar um responsável
router.delete("/:id", async (req, res) => {
  try {
    await Responsavel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Responsável deletado com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
