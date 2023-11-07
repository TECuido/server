/*
  Warnings:

  - You are about to drop the column `token` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Emergencia" ALTER COLUMN "latitud" DROP NOT NULL,
ALTER COLUMN "longitud" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "token";

-- CreateTable
CREATE TABLE "Llamada" (
    "idLlamada" TEXT NOT NULL,
    "idusuarioEmisor" INTEGER NOT NULL,
    "idusuarioReceptor" INTEGER NOT NULL,

    CONSTRAINT "Llamada_pkey" PRIMARY KEY ("idLlamada")
);

-- CreateIndex
CREATE UNIQUE INDEX "Llamada_idLlamada_key" ON "Llamada"("idLlamada");

-- CreateIndex
CREATE UNIQUE INDEX "Llamada_idusuarioEmisor_idusuarioReceptor_key" ON "Llamada"("idusuarioEmisor", "idusuarioReceptor");

-- AddForeignKey
ALTER TABLE "Llamada" ADD CONSTRAINT "Llamada_idusuarioEmisor_fkey" FOREIGN KEY ("idusuarioEmisor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Llamada" ADD CONSTRAINT "Llamada_idusuarioReceptor_fkey" FOREIGN KEY ("idusuarioReceptor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
