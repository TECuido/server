/*
  Warnings:

  - You are about to drop the column `idUsuarioDetalle` on the `UsuarioDetalles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuarioPerfil,idContactoEmergencia]` on the table `UsuarioDetalles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `direccion` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donacionOrganos` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edad` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuarioPerfil` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfusionSanguinea` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsuarioDetalles" DROP CONSTRAINT "UsuarioDetalles_idUsuarioDetalle_fkey";

-- DropIndex
DROP INDEX "UsuarioDetalles_idUsuarioDetalle_idContactoEmergencia_key";

-- AlterTable
ALTER TABLE "UsuarioDetalles" DROP COLUMN "idUsuarioDetalle",
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "donacionOrganos" TEXT NOT NULL,
ADD COLUMN     "edad" TEXT NOT NULL,
ADD COLUMN     "idUsuarioPerfil" INTEGER NOT NULL,
ADD COLUMN     "transfusionSanguinea" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MedicoTratante" (
    "idMedicoTratante" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,

    CONSTRAINT "MedicoTratante_pkey" PRIMARY KEY ("idMedicoTratante")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicoTratante_idMedicoTratante_key" ON "MedicoTratante"("idMedicoTratante");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuarioPerfil_idContactoEmergencia_key" ON "UsuarioDetalles"("idUsuarioPerfil", "idContactoEmergencia");

-- AddForeignKey
ALTER TABLE "UsuarioDetalles" ADD CONSTRAINT "UsuarioDetalles_idUsuarioPerfil_fkey" FOREIGN KEY ("idUsuarioPerfil") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
