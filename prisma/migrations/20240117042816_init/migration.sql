/*
  Warnings:

  - Made the column `numPoliza` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipoSangre` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `donacionOrganos` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `edad` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transfusionSanguinea` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicoTratante` on table `UsuarioDetalles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UsuarioDetalles" ALTER COLUMN "numPoliza" SET NOT NULL,
ALTER COLUMN "tipoSangre" SET NOT NULL,
ALTER COLUMN "direccion" SET NOT NULL,
ALTER COLUMN "donacionOrganos" SET NOT NULL,
ALTER COLUMN "edad" SET NOT NULL,
ALTER COLUMN "transfusionSanguinea" SET NOT NULL,
ALTER COLUMN "medicoTratante" SET NOT NULL;
