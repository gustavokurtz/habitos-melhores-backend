-- CreateTable
CREATE TABLE "Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
