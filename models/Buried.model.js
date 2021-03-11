const { Schema, model } = require("mongoose");

const BuriedSchema = new Schema({
  name: String,
  dateOfBirth: Date,
  dateOfDeath: { type: Date, required: true },
  deathCertificate: { type: String, required: true },
  picture: String,
  burialDate: { type: Date, required: true },
  burialTime: String,
  funeralHome: { type: String, required: true },
  funeralAgent: String,
  authorization: { type: String, required: true },
  situation: {
    type: String,
    required: true,
    enum: ["Pendente", "Sepultado", "Exumado", "Aberto", "Transferido"],
  },
  grave: { type: Schema.Types.ObjectId, ref: "Grave" },
});

const BuriedModel = model("Buried", BuriedSchema);

module.exports = BuriedModel;
