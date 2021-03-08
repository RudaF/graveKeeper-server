const { Schema, model } = require("mongoose");

const CemeterySchema = new Schema({
  maxCapacity: { type: Number, required: true },
  name: { type: String, required: true },
  adress: { type: String, required: true },
  employees: Number,
  graves: [{ type: Schema.Types.ObjectId, ref: "Grave" }],
});

const CemeteryModel = model("Cemetery", CemeterySchema);

module.exports = CemeteryModel;
