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
const colors = require("./colors.json");
const books = require("./books.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model")
const BrandModel = require("../db/brand.model")
const ColorModel = require("../db/colors.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColor = async () => {
  await ColorModel.deleteMany({});

  const color = colors.map((name) => ({
    name: name
  }));

  await ColorModel.create(...color);
  console.log("Colors created");
}

const populateBrand = async () => {
  await BrandModel.deleteMany({});

  const brand = brands.map((name) => ({
    name: name
  }));

  await BrandModel.create(...brand);
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
  colorsName = await ColorModel.find();
  console.log(books)

  const employees = names.map((name) => {
    const salary = Math.floor(Math.random() * 1200) + 1;
    const level = salary >= 0 && salary <= 100 ? "Junior" : salary >= 101 && salary <= 300 ? "Medior" :
    salary >= 301 && salary <= 400 ? "Senior" : salary >= 401 && salary <= 800 ?'Expert' : salary > 800 ? "Godlike" : '';
    
    return {
      name,
      level: level,
      position: pick(positions),
      present: pick([true,false]),
      salary: salary,
      years: Math.floor(Math.random() * 10) + 1,
      books: pick(books),
      favoriteBrand: pick(brandsNames),
      equipment: pick(equipment),
      favColor: pick(colorsName),
  }});

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateColor();
  
  await populateBrand();

  await populateEquipment();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
