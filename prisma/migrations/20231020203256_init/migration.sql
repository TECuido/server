/*
  Warnings:

  - A unique constraint covering the columns `[idAgrega,idAgregado]` on the table `Contacto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMiembro,idGrupo]` on the table `UsuarioGrupo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contacto_idAgrega_idAgregado_key" ON "Contacto"("idAgrega", "idAgregado");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioGrupo_idMiembro_idGrupo_key" ON "UsuarioGrupo"("idMiembro", "idGrupo");
