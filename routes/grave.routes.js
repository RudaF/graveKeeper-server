const express = require("express");
const router = express.Router();
const passport = require("passport");

// CRUD do Túmulo
const Grave = require("../models/Grave.model");
const Cemetery = require("../models/Cemetery.model");

// Crud (Create): Rota para criar um novo túmulo
router.post(
  "/:cemetery/grave/new-grave",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.body);
      const newGrave = await Grave.create({
        ...req.body,
        cemetery: req.params.cemetery,
      });
      console.log(newGrave);
      const cemetery = await Cemetery.findOneAndUpdate(
        { _id: req.params.cemetery },
        { $push: { graves: newGrave._id } },
        { new: true }
      );

      return res.status(201).json(newGrave);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para listar todos os tumulos de um cemitério
router.get(
  "/:cemetery/graves",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const graves = await Grave.find({ cemetary: req.params.cemetary });

      return res.status(200).json(graves);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para trazer um jazigo específico
router.get(
  "/grave/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log("oi");
      const grave = await Grave.findOne({ _id: req.params.id }).populate(
        "buried"
      );

      if (!grave) {
        return res.status(404).json({ msg: "Jazigo não encontrado!" });
      }

      return res.status(200).json(grave);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// crUd (Update): Rota para atualizar um jazigo específico
router.patch(
  "/grave/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedGrave = await Grave.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedGrave) {
        return res.status(404).json({ msg: "Jazigo não encontrado" });
      }

      return res.status(200).json(updatedGrave);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// cruD (Delete): Apaga o cemitério especificado do banco

router.delete(
  "/grave/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const deleted = await Cemetery.deleteOne({ _id: req.params.id });

      if (!deleted) {
        return res.status(404).json({ msg: "Jazigo não encontrado" });
      }

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
