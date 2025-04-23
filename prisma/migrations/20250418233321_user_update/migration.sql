/*
  Warnings:

  - The primary key for the `SubTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_authorId_fkey";

-- AlterTable
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "taskId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubTask_id_seq";

-- AlterTable
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tasks_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
