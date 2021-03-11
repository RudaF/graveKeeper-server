const { Schema, model } = require("mongoose");

const CemeterySchema = new Schema({
  maxCapacity: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  employees: Number,
  picture: String,
  graves: [{ type: Schema.Types.ObjectId, ref: "Grave" }],
  admId: { type: Schema.Types.ObjectId, ref: "User" },
});

const CemeteryModel = model("Cemetery", CemeterySchema);

module.exports = CemeteryModel;
