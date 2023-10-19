/*
  Warnings:

  - You are about to drop the column `idContacto` on the `ContactoGrupo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuario2]` on the table `Contacto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUsuarioAgregado` to the `ContactoGrupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactoGrupo" DROP CONSTRAINT "ContactoGrupo_idContacto_fkey";

-- AlterTable
ALTER TABLE "ContactoGrupo" DROP COLUMN "idContacto",
ADD COLUMN     "idUsuarioAgregado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Grupo" ADD COLUMN     "idUsuario" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_idUsuario2_key" ON "Contacto"("idUsuario2");

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactoGrupo" ADD CONSTRAINT "ContactoGrupo_idUsuarioAgregado_fkey" FOREIGN KEY ("idUsuarioAgregado") REFERENCES "Contacto"("idUsuario2") ON DELETE CASCADE ON UPDATE CASCADE;
