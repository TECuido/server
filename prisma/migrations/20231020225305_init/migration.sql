-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "idTipo" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TipoUsuario" (
    "idTipo" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoUsuario_pkey" PRIMARY KEY ("idTipo")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoUsuario_idTipo_key" ON "TipoUsuario"("idTipo");

-- CreateIndex
CREATE UNIQUE INDEX "TipoUsuario_nombre_key" ON "TipoUsuario"("nombre");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idTipo_fkey" FOREIGN KEY ("idTipo") REFERENCES "TipoUsuario"("idTipo") ON DELETE RESTRICT ON UPDATE CASCADE;
