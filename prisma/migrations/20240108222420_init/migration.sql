/*
  Warnings:

  - A unique constraint covering the columns `[idUsuariosDetalles]` on the table `UsuarioDetalles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UsuarioDetalles" ADD COLUMN     "idUsuariosDetalles" SERIAL NOT NULL,
ADD CONSTRAINT "UsuarioDetalles_pkey" PRIMARY KEY ("idUsuariosDetalles");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuariosDetalles_key" ON "UsuarioDetalles"("idUsuariosDetalles");
