/*
  Warnings:

  - You are about to drop the column `cta_color` on the `campaigns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "cta_color",
ADD COLUMN     "accent_color" TEXT NOT NULL DEFAULT '#FACC15';
