-- CreateTable
CREATE TABLE "Receta" (
    "idReceta" SERIAL NOT NULL,
    "idPaciente" INTEGER NOT NULL,
    "idMedico" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("idReceta")
);

-- CreateTable
CREATE TABLE "Medicamento" (
    "idMedicamento" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "uso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("idMedicamento")
);

-- CreateTable
CREATE TABLE "MedicamentoReceta" (
    "idMedicamento" INTEGER NOT NULL,
    "idReceta" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "dosis" VARCHAR(30) NOT NULL,
    "frecuencia" VARCHAR(30) NOT NULL,
    "duracion" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Receta_idReceta_key" ON "Receta"("idReceta");

-- CreateIndex
CREATE UNIQUE INDEX "Medicamento_idMedicamento_key" ON "Medicamento"("idMedicamento");

-- CreateIndex
CREATE UNIQUE INDEX "MedicamentoReceta_idMedicamento_idReceta_key" ON "MedicamentoReceta"("idMedicamento", "idReceta");

-- AddForeignKey
ALTER TABLE "Receta" ADD CONSTRAINT "Receta_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receta" ADD CONSTRAINT "Receta_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicamentoReceta" ADD CONSTRAINT "MedicamentoReceta_idReceta_fkey" FOREIGN KEY ("idReceta") REFERENCES "Receta"("idReceta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicamentoReceta" ADD CONSTRAINT "MedicamentoReceta_idMedicamento_fkey" FOREIGN KEY ("idMedicamento") REFERENCES "Medicamento"("idMedicamento") ON DELETE CASCADE ON UPDATE CASCADE;
