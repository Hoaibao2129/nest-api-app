/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_tel_key" ON "user"("tel");
