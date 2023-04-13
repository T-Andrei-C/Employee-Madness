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
const brands = require("./brands.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model")
const BrandModel = require("../db/brand.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateBrand = async () => {
  await BrandModel.deleteMany({});

  const equipment = brands.map((name) => ({
    name: name
  }));

  await BrandModel.create(...equipment);
  console.log("Brands created");
}

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
  brandsNames = await BrandModel.find();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: pick([true,false]),
    favoriteBrand: pick(brandsNames),
    equipment: pick(equipment)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  
  await populateBrand();

  await populateEquipment();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
