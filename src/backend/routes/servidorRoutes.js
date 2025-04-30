const express = require("express");
const Servidor = require("../models/Servidor");
const router = express.Router();

// Criar um novo servidor
router.post("/", async (req, res) => {
  try {
    const servidor = await Servidor.create(req.body);
    res.status(201).json(servidor);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Obter todos os servidores
router.get("/", async (req, res) => {
  try {
    const servidores = await Servidor.find();
    res.status(200).json({
      success: true,
      message: "Lista de servidores obtida com sucesso",
      data: servidores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter servidores",
      error: error.message,
    });
  }
});

// Atualizar um servidor
router.put("/:id", async (req, res) => {
  try {
    const servidor = await Servidor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(servidor);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Deletar um servidor
router.delete("/:id", async (req, res) => {
  try {
    await Servidor.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Servidor deletado com sucesso"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
