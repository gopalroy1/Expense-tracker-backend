-- CreateTable
CREATE TABLE "NetworthEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "snapshotDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NetworthEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NetworthEntry" ADD CONSTRAINT "NetworthEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
