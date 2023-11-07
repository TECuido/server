/*
  Warnings:

  - Added the required column `latitud` to the `Emergencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `Emergencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emergencia" ADD COLUMN     "latitud" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitud" DOUBLE PRECISION NOT NULL;
