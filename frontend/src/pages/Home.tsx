import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom para navegação
import '../App.css'; // Importando nosso CSS tradicional
import bannerOcara from '../assets/campeonatoOcara (2).png'; // Importando a imagem

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

export default function App() {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch('http://localhost:3333/matches')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(error => console.error("Erro ao buscar jogos:", error));
    }, []);

    return (
        <div className="app-container">

            <header className="header">
                <img src={bannerOcara} alt="Campeonato Ocarense de Futebol" className="banner-img" />
                <h1 className="title">Jogos da 1ª Rodada</h1>
            </header>

            <div className="match-grid">
                {matches.map((match) => {
                    const matchDate = new Date(match.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <div key={match.id} className="match-card">
                            <div className="match-header">
                                {match.homeTeam.group} • {matchDate}
                            </div>

                            <div className="match-content">
                                <div className="team">
                                    <div className="team-shield">Escudo</div>
                                    <Link to={`/equipe/${match.homeTeam.id}`} className="team-name" style={{ textDecoration: 'none' }}>
                                        {match.homeTeam.name}
                                    </Link>
                                </div>

                                <div className="versus">X</div>

                                <div className="team">
                                    <div className="team-shield">Escudo</div>
                                    <Link to={`/equipe/${match.awayTeam.id}`} className="team-name" style={{ textDecoration: 'none' }}>
                                        {match.awayTeam.name}
                                    </Link>
                                </div>
                            </div>

                            <div className="match-footer">
                                📍 {match.location}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}