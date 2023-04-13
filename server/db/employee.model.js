// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  favoriteBrand: {
    type: Schema.ObjectId, ref: "Brand"
  },
  equipment: {    
    type: Schema.ObjectId, ref: "Equipment"
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
