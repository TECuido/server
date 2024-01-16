/*
  Warnings:

  - A unique constraint covering the columns `[telefono]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Contacto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsuarioDetalles" DROP CONSTRAINT "UsuarioDetalles_idContactoEmergencia_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioGrupo" DROP CONSTRAINT "UsuarioGrupo_idMiembro_fkey";

-- AlterTable
ALTER TABLE "Contacto" ADD COLUMN     "correo" VARCHAR(100),
ADD COLUMN     "nombre" VARCHAR(100) NOT NULL,
ADD COLUMN     "telefono" VARCHAR(20),
ALTER COLUMN "idAgregado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "telefono" VARCHAR(20) NOT NULL,
ALTER COLUMN "correo" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefono_key" ON "Usuario"("telefono");

-- AddForeignKey
ALTER TABLE "UsuarioGrupo" ADD CONSTRAINT "UsuarioGrupo_idMiembro_fkey" FOREIGN KEY ("idMiembro") REFERENCES "Contacto"("idContacto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioDetalles" ADD CONSTRAINT "UsuarioDetalles_idContactoEmergencia_fkey" FOREIGN KEY ("idContactoEmergencia") REFERENCES "Contacto"("idContacto") ON DELETE CASCADE ON UPDATE CASCADE;
