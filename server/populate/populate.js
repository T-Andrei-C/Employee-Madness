/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipmentNames = require("./equipmentNames.json");
const equipmentType = require("./equipmentType.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = equipmentNames.map((name) => ({
    name: name,
    amount: Math.floor(Math.random() * 10) + 1, 
    type: pick(equipmentType)
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  equipment = await EquipmentModel.find();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipment)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
