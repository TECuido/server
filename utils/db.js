// Aqui definimos la base de datos
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

module.exports = { db };
