/*
  Warnings:

  - The primary key for the `UsuarioDetalles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUsuariosDetalles` on the `UsuarioDetalles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UsuarioDetalles_idUsuariosDetalles_key";

-- AlterTable
ALTER TABLE "UsuarioDetalles" DROP CONSTRAINT "UsuarioDetalles_pkey",
DROP COLUMN "idUsuariosDetalles";
