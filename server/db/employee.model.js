// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  salary: Number,
  years: Number,
  books: [{
    bookName: String,
    author: String
  }],
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
  favColor: {
    type: Schema.ObjectId, ref: "Color"
  },
  salary: Number
});

module.exports = mongoose.model("Employee", EmployeeSchema);
