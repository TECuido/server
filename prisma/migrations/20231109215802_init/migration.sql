/*
  Warnings:

  - You are about to drop the column `idusuarioEmisor` on the `Llamada` table. All the data in the column will be lost.
  - You are about to drop the column `idusuarioReceptor` on the `Llamada` table. All the data in the column will be lost.
  - Added the required column `idUsuarioEmisor` to the `Llamada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuarioReceptor` to the `Llamada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Llamada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Llamada" DROP CONSTRAINT "Llamada_idusuarioEmisor_fkey";

-- DropForeignKey
ALTER TABLE "Llamada" DROP CONSTRAINT "Llamada_idusuarioReceptor_fkey";

-- DropIndex
DROP INDEX "Llamada_idusuarioEmisor_idusuarioReceptor_key";

-- AlterTable
ALTER TABLE "Llamada" DROP COLUMN "idusuarioEmisor",
DROP COLUMN "idusuarioReceptor",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idUsuarioEmisor" INTEGER NOT NULL,
ADD COLUMN     "idUsuarioReceptor" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Llamada" ADD CONSTRAINT "Llamada_idUsuarioEmisor_fkey" FOREIGN KEY ("idUsuarioEmisor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Llamada" ADD CONSTRAINT "Llamada_idUsuarioReceptor_fkey" FOREIGN KEY ("idUsuarioReceptor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
