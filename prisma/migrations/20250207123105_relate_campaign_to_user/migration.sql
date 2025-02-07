/*
  Warnings:

  - Added the required column `user_id` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "campaigns_id_idx";

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "campaigns_user_id_idx" ON "campaigns"("user_id");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
