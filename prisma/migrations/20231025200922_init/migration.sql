/*
  Warnings:

  - Added the required column `nombreContacto` to the `Contacto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacto" ADD COLUMN     "nombreContacto" TEXT NOT NULL;
