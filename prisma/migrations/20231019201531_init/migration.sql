/*
  Warnings:

  - You are about to drop the column `idUsuario1` on the `Contacto` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario2` on the `Contacto` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuarioAgregado` on the `ContactoGrupo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idAgregado]` on the table `Contacto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idAgrega` to the `Contacto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAgregado` to the `Contacto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMiembro` to the `ContactoGrupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacto" DROP CONSTRAINT "Contacto_idUsuario1_fkey";

-- DropForeignKey
ALTER TABLE "Contacto" DROP CONSTRAINT "Contacto_idUsuario2_fkey";

-- DropForeignKey
ALTER TABLE "ContactoGrupo" DROP CONSTRAINT "ContactoGrupo_idUsuarioAgregado_fkey";

-- DropIndex
DROP INDEX "Contacto_idUsuario2_key";

-- AlterTable
ALTER TABLE "Contacto" DROP COLUMN "idUsuario1",
DROP COLUMN "idUsuario2",
ADD COLUMN     "idAgrega" INTEGER NOT NULL,
ADD COLUMN     "idAgregado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ContactoGrupo" DROP COLUMN "idUsuarioAgregado",
ADD COLUMN     "idMiembro" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_idAgregado_key" ON "Contacto"("idAgregado");

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_idAgrega_fkey" FOREIGN KEY ("idAgrega") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_idAgregado_fkey" FOREIGN KEY ("idAgregado") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactoGrupo" ADD CONSTRAINT "ContactoGrupo_idMiembro_fkey" FOREIGN KEY ("idMiembro") REFERENCES "Contacto"("idAgregado") ON DELETE CASCADE ON UPDATE CASCADE;
