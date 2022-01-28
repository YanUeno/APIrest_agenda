-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "Pessoa_id" INTEGER;

-- AlterTable
ALTER TABLE "Pessoas" ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "Evento" ADD FOREIGN KEY ("Pessoa_id") REFERENCES "Pessoas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
