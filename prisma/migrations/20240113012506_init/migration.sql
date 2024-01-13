/*
  Warnings:

  - You are about to drop the `MedicoTratante` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "UsuarioDetalles" ALTER COLUMN "numPoliza" DROP NOT NULL,
ALTER COLUMN "tipoSangre" DROP NOT NULL,
ALTER COLUMN "direccion" DROP NOT NULL,
ALTER COLUMN "donacionOrganos" DROP NOT NULL,
ALTER COLUMN "edad" DROP NOT NULL,
ALTER COLUMN "transfusionSanguinea" DROP NOT NULL,
ALTER COLUMN "medicoTratante" DROP NOT NULL;

-- DropTable
DROP TABLE "MedicoTratante";
