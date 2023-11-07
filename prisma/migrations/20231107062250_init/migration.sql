/*
  Warnings:

  - Added the required column `updatedAt` to the `Contacto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Emergencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Emergencia" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Grupo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
