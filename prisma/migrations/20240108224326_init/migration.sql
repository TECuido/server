/*
  Warnings:

  - You are about to drop the column `idUsuarioPerfil` on the `UsuarioDetalles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuario,idContactoEmergencia]` on the table `UsuarioDetalles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUsuario` to the `UsuarioDetalles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsuarioDetalles" DROP CONSTRAINT "UsuarioDetalles_idUsuarioPerfil_fkey";

-- DropIndex
DROP INDEX "UsuarioDetalles_idUsuarioPerfil_idContactoEmergencia_key";

-- AlterTable
ALTER TABLE "UsuarioDetalles" DROP COLUMN "idUsuarioPerfil",
ADD COLUMN     "idUsuario" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuario_idContactoEmergencia_key" ON "UsuarioDetalles"("idUsuario", "idContactoEmergencia");

-- AddForeignKey
ALTER TABLE "UsuarioDetalles" ADD CONSTRAINT "UsuarioDetalles_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
