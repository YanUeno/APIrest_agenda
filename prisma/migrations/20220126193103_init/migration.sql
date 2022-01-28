-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventoToPessoas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventoToPessoas_AB_unique" ON "_EventoToPessoas"("A", "B");

-- CreateIndex
CREATE INDEX "_EventoToPessoas_B_index" ON "_EventoToPessoas"("B");

-- AddForeignKey
ALTER TABLE "_EventoToPessoas" ADD FOREIGN KEY ("A") REFERENCES "Evento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToPessoas" ADD FOREIGN KEY ("B") REFERENCES "Pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
