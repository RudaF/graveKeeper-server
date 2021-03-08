const express = require("express");
const router = express.Router();
const passport = require("passport");

// CRUD do Cemitério
const Cemetery = require("../models/Cemetery.model");
const User = require("../models/User.model");

// Crud (Create): Rota para criar um novo cemitério
router.post(
  "/cemetery/new-cemetery",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newCemetery = await Cemetery.create({
        ...req.body,
      });

      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { cemeteries: newCemetery._id } },
        { new: true }
      );

      return res.status(201).json(newBuried);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para listar todos os cemitérios sob administração do usuário
router.get(
  "/cemetery",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cemeteries = await Cemetery.find({ ownerId: req.user._id });

      return res.status(200).json(cemeteries);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para trazer um cemitério específico
router.get(
  "/cemetery/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cemetery = await Cemetery.findOne({ _id: req.params.id }).populate(
        "graves"
      );

      if (!cemetery) {
        return res.status(404).json({ msg: "Cemitério não encontrado!" });
      }

      return res.status(200).json(cemetery);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// crUd (Update): Rota para atualizar um cemitério específico
router.patch(
  "/cemetery/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedCemetery = await Cemetery.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedCemetery) {
        return res.status(404).json({ msg: "Cemitério não encontrado" });
      }

      return res.status(200).json(updatedCemetery);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// cruD (Delete): Apaga o cemitério especificado do banco

router.delete(
  "/cemetery/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const deleted = await Cemetery.deleteOne({ _id: req.params.id });

      if (!deleted) {
        return res.status(404).json({ msg: "Cemitério não encontrado" });
      }

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
