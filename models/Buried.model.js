const { Schema, model } = require("mongoose");

const BuriedSchema = new Schema({
  name: String,
  dateOfBirth: Date,
  dateOfDeath: { type: Date, required: true },
  deathCertificate: { type: String, required: true },
  picture: { type: String, required: true },
  burialDate: { type: Date, required: true },
  burialTime: { type: Date, required: true },
  funeralHome: { type: String, required: true },
  funeralAgent: { type: String, required: true },
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
