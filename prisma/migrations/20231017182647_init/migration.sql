-- CreateTable
CREATE TABLE "Emergencia" (
    "idEmergencia" SERIAL NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idEmisor" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "Emergencia_pkey" PRIMARY KEY ("idEmergencia")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emergencia_idEmergencia_key" ON "Emergencia"("idEmergencia");

-- AddForeignKey
ALTER TABLE "Emergencia" ADD CONSTRAINT "Emergencia_idEmisor_fkey" FOREIGN KEY ("idEmisor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emergencia" ADD CONSTRAINT "Emergencia_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
