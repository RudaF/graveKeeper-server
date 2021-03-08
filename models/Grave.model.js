const { Schema, model } = require("mongoose");

const GraveSchema = new Schema({
  description: String,
  type: {
    type: String,
    required: true,
    enum: ["Subterrânea", "Superfície"],
  },
  maxCapacity: { type: Number, required: true },
  installment: { type: Number, required: true },
  location: { type: String, required: true },
  cemetery: { type: Schema.Types.ObjectId, ref: "Cemetery" },
  buried: [{ type: Schema.Types.ObjectId, ref: "Buried" }],
});

const GraveModel = model("Grave", GraveSchema);

module.exports = GraveModel;
