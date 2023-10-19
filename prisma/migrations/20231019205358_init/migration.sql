/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `Grupo` table. All the data in the column will be lost.
  - You are about to drop the `ContactoGrupo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idCreador` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactoGrupo" DROP CONSTRAINT "ContactoGrupo_idGrupo_fkey";

-- DropForeignKey
ALTER TABLE "ContactoGrupo" DROP CONSTRAINT "ContactoGrupo_idMiembro_fkey";

-- DropForeignKey
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_idUsuario_fkey";

-- DropIndex
DROP INDEX "Contacto_idAgregado_key";

-- AlterTable
ALTER TABLE "Grupo" DROP COLUMN "idUsuario",
ADD COLUMN     "idCreador" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ContactoGrupo";

-- CreateTable
CREATE TABLE "UsuarioGrupo" (
    "idContactoGrupo" SERIAL NOT NULL,
    "idMiembro" INTEGER NOT NULL,
    "idGrupo" INTEGER NOT NULL,

    CONSTRAINT "UsuarioGrupo_pkey" PRIMARY KEY ("idContactoGrupo")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioGrupo_idContactoGrupo_key" ON "UsuarioGrupo"("idContactoGrupo");

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_idCreador_fkey" FOREIGN KEY ("idCreador") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioGrupo" ADD CONSTRAINT "UsuarioGrupo_idMiembro_fkey" FOREIGN KEY ("idMiembro") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioGrupo" ADD CONSTRAINT "UsuarioGrupo_idGrupo_fkey" FOREIGN KEY ("idGrupo") REFERENCES "Grupo"("idGrupo") ON DELETE CASCADE ON UPDATE CASCADE;
