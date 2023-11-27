/*
  Warnings:

  - Added the required column `nombre` to the `Receta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Receta" ADD COLUMN     "nombre" VARCHAR(100) NOT NULL;
