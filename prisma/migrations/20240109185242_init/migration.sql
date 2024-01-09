/*
  Warnings:

  - Added the required column `idUsuario` to the `MedicoTratante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicoTratante" ADD COLUMN     "idUsuario" INTEGER NOT NULL;
