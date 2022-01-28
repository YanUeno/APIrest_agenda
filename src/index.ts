// playlist/src/index.ts

import { PrismaClient } from '@prisma/client'
import express from 'express'
import { monitorEventLoopDelay } from 'perf_hooks'
import { URLSearchParams } from 'url'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// ////// Pessoa

//Cria pessoa
app.post(`/pessoas`, async (req, res) => {
    const result = await prisma.pessoas.create({
        data: { ...req.body },
    })
    //console.log(result.);
    res.json({
        success: true,
        payload: result,
    })
})
// Lista pessoa
app.get('/pessoas', async (req, res) => {
    const pessoas = await prisma.pessoas.findMany()
    res.json({
        success: true,
        payload: pessoas,
    })
})
// lista todas as pessoas com os eventos
app.get('/pessoas_evt', async (req, res) => {
  const pessoas = await prisma.pessoas.findMany({
    include: {
      evento: true
    }
  })
  res.json({
    success: true,
    payload: pessoas,
  })
})
// pegar eventos de uma pessoa propria
app.get('/pessoas_evt/:id', async (req, res) => {
  const { id } = req.params
  const pessoas = await prisma.pessoas.findUnique({
    where:{
      id : Number(id)
    },
    include: {
      evento: true
    }
  })
  res.json({
    success: true,
    payload: pessoas,
  })
})

// Pega uma determinada pessoa
app.get(`/pessoas/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.pessoas.findMany({
        where: { id: Number(id) },
    })
    res.json({
      success: true,
      payload: post,
    })
})
// atualiza pessoas
app.put('/pessoas/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.pessoas.update({
      where: { id: Number(id) },
      data: { ...req.body },
    })
    res.json({
      success: true,
      payload: post,
    })
})
//deleta pessoa
app.delete(`/pessoas/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.pessoas.delete({
      where: { id: Number(id) },
    })
    res.json({
      success: true,
      payload: post,
    })
})

// atribui evento na pessoa
app.put('/pessoas/:id/evento/:id_evento', async (req, res) => {
  const { id , id_evento} = req.params
  const pessoa = await prisma.pessoas.update({
    where: { id: Number(id) },
    data: {
      evento: {
        connect: [{ id: Number(id_evento) }], // connect that member with the event ID
      },
    },
  });
  res.json({
    success: true,
    payload: pessoa,
  })
})
//  pesquisa Pessoa
app.get(`/pesquisa`, async (req, res) => {
  const { name } = req.body
  const post = await prisma.pessoas.findMany({
    where: {
    AND:[
      {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    ]
  },
  select: {
    id: true,
    name: true,
    email: true,
    evento: true
  }
  })
  res.json({
    success: true,
    payload: post,
  })
})

// deleta todas as pessoas do evento
app.put('/evento/:id_evento/delete', async (req, res) => {
  const { id_evento} = req.params
  const del = await prisma.evento.update({
    where: {
      id: Number(id_evento),
    },
    data: {
      pessoas: {
        set:[
          
        ]
      },
    },
  })
  res.json({
    success: true,
    payload: del,
  })
})

// deleta pessoa do evento
app.put('/pessoas/:id/evento/:id_evento/delete', async (req, res) => {
  const { id , id_evento} = req.params
  const del = await prisma.evento.update({
    where: {
      id: Number(id_evento)
    }, 
    data: {
      pessoas: {
        disconnect: [
          {id : Number(id)}
        ]
      }
    }, 
    select: {
      id: true,
      pessoas: true
    }
  })
  res.json({
    success: true,
    payload: del,
  })
})

// ////// Evento

//Cria evento
app.post(`/evento`, async (req, res) => {
    const result = await prisma.evento.create({
        data: { ...req.body },
    })
    res.json({
        success: true,
        payload: result,
    })
})
// lista evento
app.get('/evento', async (req, res) => {
    const result = await prisma.evento.findMany({
      include: {
        pessoas: true
      }
    })
    res.json({
        success: true,
        payload: result,
    })
})
// Lista um determinado evento
app.get(`/evento/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.evento.findMany({
        where: { id: Number(id) },
        include: {
          pessoas: true
        }
    })
    res.json({
      success: true,
      payload: post,
    })
})
// atualiza evento
app.put('/evento/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.evento.update({
      where: { id: Number(id) },
      data: { ...req.body },
    })
    res.json({
      success: true,
      payload: post,
    })
})
//deleta Evento
  app.delete(`/evento/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.evento.delete({
      where: { id: Number(id) },
    })
    res.json({
      success: true,
      payload: post,
    })
})
  
//  pesquisa evento
app.get(`/pesquisa/evento`, async (req, res) => {
  const { titulo } = req.body
  const post = await prisma.evento.findMany({
    where: {
    AND:[
      {
        titulo: {
          contains: titulo,
          mode: 'insensitive'
        }
      }
    ]
  },
  select: {
    id: true,
    titulo: true,
    pessoas: true
  }
  })
  res.json({
    success: true,
    payload: post,
})
})



app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});
  


app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
