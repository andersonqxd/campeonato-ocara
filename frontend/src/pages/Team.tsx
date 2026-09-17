import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

// Tipagem para o TypeScript saber o que vem do banco
interface TeamData {
  id: number;
  name: string;
  group: string;
  history: string | null;
}

export default function Team() {
  const { id } = useParams(); // Pega apenas o ID da URL
  const [team, setTeam] = useState<TeamData | null>(null);

  useEffect(() => {
    // Pede para o back-end os dados do time com este ID
    fetch(`http://localhost:3333/teams/${id}`)
      .then(response => response.json())
      .then(data => setTeam(data))
      .catch(error => console.error("Erro ao buscar time:", error));
  }, [id]);

  // Enquanto o dado não chega da API, mostramos um aviso
  if (!team) {
    return <div className="app-container">Carregando dados da equipe...</div>;
  }

  return (
    <div className="app-container">
      <Link to="/" style={{ color: 'var(--azul-principal)', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Voltar para os jogos
      </Link>
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        {/* Agora o team.name é injetado diretamente do banco de dados! */}
        <h1 className="title">Página da Equipe: {team.name}</h1>
        
        <div style={{ marginTop: '15px' }}>
          <p><strong>Grupo:</strong> {team.group}</p>
          <p><strong>História:</strong> {team.history || 'História ainda não cadastrada.'}</p>
        </div>

        <p style={{ marginTop: '20px', color: '#666' }}>
          (Aqui embaixo vai entrar a tabela de jogadores com cartões e gols em breve!)
        </p>
      </div>
    </div>
  );
}