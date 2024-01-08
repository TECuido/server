/*
  Warnings:

  - You are about to drop the column `contactoEmergencia` on the `UsuarioDetalles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuariosDetalles]` on the table `UsuarioDetalles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuarioDetalle,idContactoEmergencia]` on the table `UsuarioDetalles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idContactoEmergencia` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoSangre` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UsuarioDetalles_idUsuarioDetalle_key";

-- AlterTable
ALTER TABLE "UsuarioDetalles" DROP COLUMN "contactoEmergencia",
ADD COLUMN     "idContactoEmergencia" INTEGER NOT NULL,
ADD COLUMN     "idUsuariosDetalles" SERIAL NOT NULL,
ADD COLUMN     "tipoSangre" TEXT NOT NULL,
ADD CONSTRAINT "UsuarioDetalles_pkey" PRIMARY KEY ("idUsuariosDetalles");

-- CreateTable
CREATE TABLE "Alergias" (
    "idAlergia" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Alergias_pkey" PRIMARY KEY ("idAlergia")
);

-- CreateTable
CREATE TABLE "MedicamentosActuales" (
    "idMedicamentoActual" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "MedicamentosActuales_pkey" PRIMARY KEY ("idMedicamentoActual")
);

-- CreateTable
CREATE TABLE "CondicionMedica" (
    "idCondicionMedica" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "CondicionMedica_pkey" PRIMARY KEY ("idCondicionMedica")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alergias_idAlergia_key" ON "Alergias"("idAlergia");

-- CreateIndex
CREATE UNIQUE INDEX "MedicamentosActuales_idMedicamentoActual_key" ON "MedicamentosActuales"("idMedicamentoActual");

-- CreateIndex
CREATE UNIQUE INDEX "CondicionMedica_idCondicionMedica_key" ON "CondicionMedica"("idCondicionMedica");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuariosDetalles_key" ON "UsuarioDetalles"("idUsuariosDetalles");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuarioDetalle_idContactoEmergencia_key" ON "UsuarioDetalles"("idUsuarioDetalle", "idContactoEmergencia");

-- AddForeignKey
ALTER TABLE "UsuarioDetalles" ADD CONSTRAINT "UsuarioDetalles_idContactoEmergencia_fkey" FOREIGN KEY ("idContactoEmergencia") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
