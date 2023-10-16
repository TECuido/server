/*
  Warnings:

  - A unique constraint covering the columns `[idUsuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "idToken" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("idToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_idToken_key" ON "RefreshToken"("idToken");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_idUsuario_key" ON "Usuario"("idUsuario");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE CASCADE ON UPDATE CASCADE;
