/*
  Warnings:

  - Added the required column `user_id` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
