import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderInstitucional from '../components/HeaderInstitucional/HeaderInstitucional';
import bannerOcara from '../assets/campeonatoOcara (2).png';
import '../App.css';

interface Team {
    id: number;
    name: string;
    group: string;
}

interface Match {
    id: number;
    date: string;
    location: string;
    status: string;
    homeTeam: Team;
    awayTeam: Team;
}

export default function Home() {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch('http://localhost:3333/matches')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(error => console.error("Erro ao buscar jogos:", error));
    }, []);

    // Agrupa os jogos por grupo do time mandante
    const groupedMatches = matches.reduce((acc: { [key: string]: Match[] }, match) => {
        const grupo = match.homeTeam.group || 'Outros';
        if (!acc[grupo]) {
            acc[grupo] = [];
        }
        acc[grupo].push(match);
        return acc;
    }, {});

    return (
        <div>
            {/* Cabeçalho fixo institucional da Prefeitura */}
            <HeaderInstitucional />

            <div className="app-container" style={{ maxWidth: '800px', marginTop: '20px' }}>

                <header className="header">
                    <img src={bannerOcara} alt="Campeonato Ocarense de Futebol" className="banner-img" />
                    <h1 className="title" style={{ fontSize: '1.8rem', marginTop: '10px' }}>Campeonato Ocarense de Futebol - 1ª Divisão 2026</h1>
                </header>

                {/* Exibe os jogos separados por grupo */}
                {/* Exibe os jogos separados por grupo */}
                {Object.keys(groupedMatches).sort().map((grupo) => (
                    <div key={grupo} className="grupo-container">
                        <div className="grupo-titulo">
                            {grupo}
                        </div>

                        <div className="partidas-lista">
                            {groupedMatches[grupo].map((match) => {
                                const matchDate = new Date(match.date).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <div key={match.id} className="match-card">
                                        <div className="match-header">
                                            📅 {matchDate} &bull; 📍 {match.location}
                                        </div>

                                        <div className="match-content">
                                            {/* Mandante (Alinhado à direita) */}
                                            <div className="team home">
                                                <Link to={`/equipe/${match.homeTeam.id}`} className="team-name">
                                                    {match.homeTeam.name}
                                                </Link>
                                                <div className="team-shield">ESC</div>
                                            </div>

                                            <div className="versus">X</div>

                                            {/* Visitante (Alinhado à esquerda) */}
                                            <div className="team away">
                                                <div className="team-shield">ESC</div>
                                                <Link to={`/equipe/${match.awayTeam.id}`} className="team-name">
                                                    {match.awayTeam.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}