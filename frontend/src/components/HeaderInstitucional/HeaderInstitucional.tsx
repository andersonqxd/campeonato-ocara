import './HeaderInstitucional.css';
import logoOcara from '../../assets/campeonatoOcara (1).png';

export default function HeaderInstitucional() {
    return (
        <header className='topo-institucional'>
            {/*Barra superior escura*/}
            <div className='barra-superior'>
                <div className='conteudo-limitado'>
                    <span>Prefeitura Municipal de Ocara</span>
                    <div className='links-uteis'>
                        <a href="#ouvidoria">🎧 Ouvidoria/Sic</a>
                        <a href="#acessibilidade">♿ Acessibilidade</a>
                    </div>
                </div>
            </div>

            {/*Linha colorida de destaque*/}
            <div className='linha-colorida'></div>
            {/* Faixa branca com a logo da prefeitura */}
            <div className="faixa-principal">
                <div className="conteudo-limitado logo-area">
                    <div className="logo-prefeitura">
                        <a href="https://www.ocara.ce.gov.br/">
                            <img src={logoOcara} alt="Logo da Prefeitura de Ocara" />
                        </a>
                    </div>
                    <div className="selos-prefeitura">
                        <span className="selo">🌱 TCE Ceará</span>
                        <span className="selo">👶 Selo Unicef</span>
                        <span className="selo">📚 Alfabetização</span>
                    </div>
                </div>
            </div>

            {/* Barra de navegação inferior */}
            <nav className="barra-navegacao">
                <div className="conteudo-limitado nav-links">
                    <a href="https://www.ocara.ce.gov.br/">Início</a>
                    <a href="#prefeitura">A Prefeitura ▾</a>
                    <a href="#municipio">O Município ▾</a>
                    <a href="#secretarias">Secretarias ▾</a>
                    <a href="#servicos">Serviços</a>
                    <a href="#contas">LRF e Contas Públicas ▾</a>
                    <a href="#publicacoes">Publicações ▾</a>
                </div>
            </nav>
        </header>
    );
}