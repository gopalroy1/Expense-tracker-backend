-- CreateTable
CREATE TABLE "SyncedDay" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncedDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SyncedDay_userId_idx" ON "SyncedDay"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SyncedDay_userId_date_key" ON "SyncedDay"("userId", "date");

-- AddForeignKey
ALTER TABLE "SyncedDay" ADD CONSTRAINT "SyncedDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
