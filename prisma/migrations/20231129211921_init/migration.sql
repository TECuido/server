-- CreateTable
CREATE TABLE "UsuarioDetalles" (
    "idUsuarioDetalle" INTEGER NOT NULL,
    "idAgregado" INTEGER NOT NULL,
    "numPoliza" INTEGER NOT NULL,
    "contactoEmergencia" VARCHAR(50) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDetalles_idUsuarioDetalle_key" ON "UsuarioDetalles"("idUsuarioDetalle");

-- AddForeignKey
ALTER TABLE "UsuarioDetalles" ADD CONSTRAINT "UsuarioDetalles_idUsuarioDetalle_fkey" FOREIGN KEY ("idUsuarioDetalle") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
