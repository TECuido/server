/*
  Warnings:

  - You are about to drop the column `pasword` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "pasword",
ADD COLUMN     "password" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "Post";
