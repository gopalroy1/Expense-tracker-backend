-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "address" TEXT,
    "dob" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountType" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountName" (
    "id" TEXT NOT NULL,
    "accountTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AccountName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_userId_type_key" ON "AccountType"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "AccountName_accountTypeId_name_key" ON "AccountName"("accountTypeId", "name");

-- AddForeignKey
ALTER TABLE "AccountType" ADD CONSTRAINT "AccountType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountName" ADD CONSTRAINT "AccountName_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
