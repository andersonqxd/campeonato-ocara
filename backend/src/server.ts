import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client';


// Inicialização express e do Prisma Client
const app = express();
const prisma = new PrismaClient();


// middlewares
app.use(cors());
app.use(express.json());

// rota para testatar se o servidor está on
app.get('/', (req, res) => {
    res.json({message: '⚽ API do Campeonato de Ocara rodando perfeitamente!'});
})


// rota para buscar todos os times cadastrados
app.get('/teams', async (req, res) => {
    try {
        const teams = await prisma.team.findMany();
        res.json(teams);
    } catch(error) {
        res.status(500).json({error: 'Erro ao buscar os times'});
    }
})

// rota para listar as partuidas agendadas
app.get('/matches', async (req, res) => {
    try {
        const matches = await prisma.match.findMany({   
            include: {
                homeTeam: true,
                awayTeam: true,
            },
        });
        res.json(matches);
    } catch(error) {
        res.status(500).json({error: 'Erro ao buscar as partidas'});
    } 
})

// Rota para buscar UM time específico pelo ID
app.get('/teams/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await prisma.team.findUnique({
      where: { id: Number(id) },
      include: { players: true } // Já deixamos os jogadores engatilhados para a próxima etapa!
    });
    
    if (!team) {
      return res.status(404).json({ error: 'Time não encontrado' });
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o time' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor voando alto na porta 👉 http://localhost:${PORT}`);
});