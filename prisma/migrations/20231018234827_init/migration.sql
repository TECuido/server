-- CreateTable
CREATE TABLE "Contacto" (
    "idContacto" SERIAL NOT NULL,
    "idUsuario1" INTEGER NOT NULL,
    "idUsuario2" INTEGER NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("idContacto")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "idGrupo" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("idGrupo")
);

-- CreateTable
CREATE TABLE "ContactoGrupo" (
    "idContactoGrupo" SERIAL NOT NULL,
    "idContacto" INTEGER NOT NULL,
    "idGrupo" INTEGER NOT NULL,

    CONSTRAINT "ContactoGrupo_pkey" PRIMARY KEY ("idContactoGrupo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_idContacto_key" ON "Contacto"("idContacto");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_idGrupo_key" ON "Grupo"("idGrupo");

-- CreateIndex
CREATE UNIQUE INDEX "ContactoGrupo_idContactoGrupo_key" ON "ContactoGrupo"("idContactoGrupo");

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_idUsuario1_fkey" FOREIGN KEY ("idUsuario1") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_idUsuario2_fkey" FOREIGN KEY ("idUsuario2") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactoGrupo" ADD CONSTRAINT "ContactoGrupo_idContacto_fkey" FOREIGN KEY ("idContacto") REFERENCES "Contacto"("idContacto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactoGrupo" ADD CONSTRAINT "ContactoGrupo_idGrupo_fkey" FOREIGN KEY ("idGrupo") REFERENCES "Grupo"("idGrupo") ON DELETE CASCADE ON UPDATE CASCADE;
