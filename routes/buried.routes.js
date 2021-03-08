const express = require("express");
const router = express.Router();
const passport = require("passport");

const uploader = require("../config/cloudinary.config");

// CRUD do Sepultado/Morto

const Buried = require("../models/Buried.model");
const Grave = require("../models/Grave.model");

// Rota para upload de imagens
router.post("/upload", uploader.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ msg: "No file uploaded" });
  }

  console.log(req.file);

  return res.status(200).json({ fileUrl: req.file.path });
});

// Crud (Create): Rota para criar um novo sepultado
router.post(
  "/:grave/buried/new-buried",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newBuried = await Buried.create({
        ...req.body,
        grave: req.params.grave,
      });

      const grave = await Grave.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { buried: newBuried._id } },
        { new: true }
      );
      return res.status(201).json(newBuried);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (Read): Rota para trazer um sepultado específico
router.get(
  "/buried/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const buried = await Buried.findOne({ _id: req.params.id })
        .populate("burial")
        .populate("grave");

      if (!buried) {
        return res.status(404).json({ msg: "Sepultado não encontrado!" });
      }

      return res.status(200).json(buried);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);

// crUd (Update): Rota para atualizar um sepultado específico
router.patch(
  "/buried/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedBuried = await Buried.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedBuried) {
        return res.status(404).json({ msg: "Sepultado não encontrado" });
      }

      return res.status(200).json(updatedBuried);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// cruD (Delete): Apaga o sepultado especificado do banco

router.delete(
  "/buried/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const deleted = await Buried.deleteOne({ _id: req.params.id });

      if (!deleted) {
        return res.status(404).json({ msg: "Sepultado não encontrado" });
      }

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
