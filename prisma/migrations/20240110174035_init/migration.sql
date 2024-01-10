/*
  Warnings:

  - You are about to drop the column `motivo` on the `MedicamentosActuales` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `MedicoTratante` table. All the data in the column will be lost.
  - Added the required column `medicoTratante` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicamentosActuales" DROP COLUMN "motivo";

-- AlterTable
ALTER TABLE "MedicoTratante" DROP COLUMN "nombre";

-- AlterTable
ALTER TABLE "UsuarioDetalles" ADD COLUMN     "medicoTratante" TEXT NOT NULL;
