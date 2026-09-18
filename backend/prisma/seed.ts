import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Limpando banco e iniciando o plantio de dados oficiais...');

  // Limpa os dados anteriores para evitar duplicações
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  // 1. CADASTRANDO AS EQUIPES POR GRUPO[cite: 1]
  const teamsData = [
    // GRUPO A[cite: 1]
    { name: 'Vila São Marcos', group: 'Grupo A' },
    { name: 'Seís Carnaúbas', group: 'Grupo A' },
    { name: 'Cearazinho', group: 'Grupo A' },
    { name: 'Lenni', group: 'Grupo A' },
    
    // GRUPO B[cite: 1]
    { name: 'Trinta e Sete', group: 'Grupo B' },
    { name: 'Lagoinha', group: 'Grupo B' },
    { name: 'Lagoa do Velho', group: 'Grupo B' },
    { name: 'Ocara', group: 'Grupo B' },
    
    // GRUPO C[cite: 1]
    { name: 'Azulão', group: 'Grupo C' },
    { name: 'Jurema', group: 'Grupo C' },
    { name: 'Serragem', group: 'Grupo C' },
    { name: 'União Foveira', group: 'Grupo C' },
    
    // GRUPO D[cite: 1]
    { name: 'Novo Horizonte', group: 'Grupo D' },
    { name: 'Renascer', group: 'Grupo D' },
    { name: 'Juventude', group: 'Grupo D' },
    { name: 'Mangueira', group: 'Grupo D' },
  ];

  console.log('⚽ Criando equipes...');
  const createdTeams = await Promise.all(
    teamsData.map(team => prisma.team.create({ data: team }))
  );

  // Função auxiliar para pegar o ID do time pelo nome
  const getTeamId = (name: string) => createdTeams.find(t => t.name === name)?.id;

  // 2. AGENDANDO A 1ª RODADA (DATA BASE: 20 DE SETEMBRO)[cite: 1]
// 2. AGENDANDO A 1ª RODADA COM LOCAL DINÂMICO BASEADO NO MANDANTE
  const matchesData = [
    // 1ª Rodada - Grupo A
    { homeTeam: 'Vila São Marcos', awayTeam: 'Seís Carnaúbas', date: '2026-09-20T16:00:00Z' },
    { homeTeam: 'Cearazinho', awayTeam: 'Lenni', date: '2026-09-20T16:00:00Z' },
    
    // 1ª Rodada - Grupo B
    { homeTeam: 'Trinta e Sete', awayTeam: 'Lagoinha', date: '2026-09-20T16:00:00Z' },
    { homeTeam: 'Lagoa do Velho', awayTeam: 'Ocara', date: '2026-09-20T16:00:00Z' },
    
    // 1ª Rodada - Grupo C
    { homeTeam: 'Azulão', awayTeam: 'Jurema', date: '2026-09-20T16:00:00Z' },
    { homeTeam: 'Serragem', awayTeam: 'União Foveira', date: '2026-09-20T16:00:00Z' },
    
    // 1ª Rodada - Grupo D
    { homeTeam: 'Novo Horizonte', awayTeam: 'Renascer', date: '2026-09-20T16:00:00Z' },
    { homeTeam: 'Juventude', awayTeam: 'Mangueira', date: '2026-09-20T16:00:00Z' },
  ];

  console.log('🏟️ Agendando partidas da 1ª Rodada...');
  for (const match of matchesData) {
    const homeTeamId = getTeamId(match.homeTeam);
    const awayTeamId = getTeamId(match.awayTeam);

    if (homeTeamId && awayTeamId) {
      await prisma.match.create({
        data: {
          date: new Date(match.date),
          // O local agora segue dinamicamente o nome do time mandante!
          location: `Estádio / Campo do ${match.homeTeam}`,
          homeTeamId,
          awayTeamId,
          status: 'AGENDADA'
        }
      });
    }
  }

  console.log('✅ Tabela do Campeonato Ocrense cadastrada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });