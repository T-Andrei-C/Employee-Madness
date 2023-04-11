const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    name: String,
    amount: Number,
    type: String,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);