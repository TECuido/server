/*
  Warnings:

  - A unique constraint covering the columns `[idGrupo]` on the table `ContactoGrupo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactoGrupo_idGrupo_key" ON "ContactoGrupo"("idGrupo");
