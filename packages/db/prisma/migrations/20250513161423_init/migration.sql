-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWalletBalane" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserWalletBalane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventToTrade" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,

    CONSTRAINT "EventToTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderBook" (
    "id" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "qty" TEXT NOT NULL,
    "opinion" BOOLEAN NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "OrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserWalletBalane_userId_key" ON "UserWalletBalane"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderBook_eventId_key" ON "OrderBook"("eventId");

-- AddForeignKey
ALTER TABLE "UserWalletBalane" ADD CONSTRAINT "UserWalletBalane_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventToTrade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBook" ADD CONSTRAINT "OrderBook_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventToTrade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
