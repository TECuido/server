/*
  Warnings:

  - Added the required column `updatedAt` to the `UsuarioEmergencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UsuarioGrupo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsuarioEmergencia" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UsuarioGrupo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
