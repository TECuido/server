-- DropForeignKey
ALTER TABLE "Emergencia" DROP CONSTRAINT "Emergencia_idReceptor_fkey";

ALTER TABLE "Emergencia" ADD COLUMN  "latitud" FLOAT;
ALTER TABLE "Emergencia" ADD COLUMN  "longitud" FLOAT;

-- AlterTable
ALTER TABLE "Emergencia" ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "latitud" DROP NOT NULL,
ALTER COLUMN "longitud" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UsuarioEmergencia" (
    "idEmergencia" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioEmergencia_idReceptor_idEmergencia_key" ON "UsuarioEmergencia"("idReceptor", "idEmergencia");

-- AddForeignKey
ALTER TABLE "UsuarioEmergencia" ADD CONSTRAINT "UsuarioEmergencia_idEmergencia_fkey" FOREIGN KEY ("idEmergencia") REFERENCES "Emergencia"("idEmergencia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmergencia" ADD CONSTRAINT "UsuarioEmergencia_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
