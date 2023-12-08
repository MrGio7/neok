-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "timezone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "creator" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserAttachedTasks" (
    "A" BIGINT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserAttachedTasks_AB_unique" ON "_UserAttachedTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAttachedTasks_B_index" ON "_UserAttachedTasks"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creator_fkey" FOREIGN KEY ("creator") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAttachedTasks" ADD CONSTRAINT "_UserAttachedTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAttachedTasks" ADD CONSTRAINT "_UserAttachedTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
