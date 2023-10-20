const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const tipo1 = await prisma.tipoUsuario.upsert({
    where: { nombre: 'Persona Sorda' },
    update: {},
    create: {
        idTipo: 0,
        nombre: 'Persona Sorda',
    }
    })

  const tipo2 = await prisma.tipoUsuario.upsert({
    where: { nombre: 'Persona Oyente' },
    update: {},
    create: {
        idTipo: 1,
        nombre: 'Persona Oyente',
    }
    })

  const tipo3 = await prisma.tipoUsuario.upsert({
    where: { nombre: 'Médico' },
    update: {},
    create: {
        idTipo: 2,
        nombre: 'Médico',
    }
    })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })