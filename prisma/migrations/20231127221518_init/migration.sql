/*
  Warnings:

  - You are about to drop the column `idMedicamento` on the `MedicamentoReceta` table. All the data in the column will be lost.
  - You are about to drop the `Medicamento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idMedicamentoReceta]` on the table `MedicamentoReceta` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MedicamentoReceta" DROP CONSTRAINT "MedicamentoReceta_idMedicamento_fkey";

-- DropIndex
DROP INDEX "MedicamentoReceta_idMedicamento_idReceta_key";

-- AlterTable
ALTER TABLE "MedicamentoReceta" DROP COLUMN "idMedicamento",
ADD COLUMN     "idMedicamentoReceta" SERIAL NOT NULL,
ADD CONSTRAINT "MedicamentoReceta_pkey" PRIMARY KEY ("idMedicamentoReceta");

-- AlterTable
ALTER TABLE "Receta" ALTER COLUMN "fecha" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "Medicamento";

-- CreateIndex
CREATE UNIQUE INDEX "MedicamentoReceta_idMedicamentoReceta_key" ON "MedicamentoReceta"("idMedicamentoReceta");
