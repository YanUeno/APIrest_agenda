import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newArtist = await prisma.pessoas.create({
    data: {
      name: 'Osinachi Kalu',
    }
  })
  console.log('Created new artist: ', newArtist)

  const allArtists = await prisma.pessoas.findMany({
  })
  console.log('All artists: ')
  console.dir(allArtists, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

//!  put a dollar-sign between "." and "disconnect"