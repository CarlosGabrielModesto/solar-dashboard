/**
 * SolarDashboard — Página principal
 *
 * Orquestra o estado global (cidade selecionada, dados da API, loading/erro),
 * busca dados na Open-Meteo e distribui para os componentes de visualização.
 *
 * Fórmulas utilizadas neste projeto:
 *   - kWh/m² = MJ/m² ÷ 3,6  →  usada em CardDiario
 *   - % barra UV = (UV / 14) × 100  →  usada em GaugeUv (apenas visual)
 *   - Demais valores exibidos diretamente como a API retorna.
 *
 * Desenvolvido por Carlos Gabriel dos Santos Modesto
 */

import { useState, useEffect, useCallback } from "react";
import {
  Sun, CloudRain, Droplets, Wind,
  Thermometer, Zap, Eye, Calendar,
  Clock, AlertTriangle,
} from "lucide-react";

/* Constantes */
import { CORES } from "../constants/cores";
import { LOCAIS, type Local } from "../constants/locais";

/* Serviço e tipos */
import {
  buscarDados, extrairDadosAtuais, montarDadosHorarios, montarDadosDiarios,
  type RespostaApi, type DadosAtuais, type DadosHorarios, type DadosDiarios,
} from "../services/api";

/* Componentes */
import Cabecalho from "../components/Cabecalho";
import CardEstatistica from "../components/CardEstatistica";
import GaugeUv from "../components/GaugeUv";
import CardDiario from "../components/CardDiario";
import SecaoGrafico from "../components/SecaoGrafico";

/* Gráficos */
import GraficoIrradiancia from "../graficos/GraficoIrradiancia";
import GraficoTemperatura from "../graficos/GraficoTemperatura";
import GraficoUv from "../graficos/GraficoUv";
import GraficoPrecipitacao from "../graficos/GraficoPrecipitacao";

/** Layout em grid responsivo */
const gridPrincipal: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 14,
  marginBottom: 14,
};

const gridGraficos: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
  gap: 14,
  marginBottom: 14,
};

export default function SolarDashboard() {
  /* Estado */
  const [local, setLocal] = useState<Local>(LOCAIS[0]!);
  const [dados, setDados] = useState<RespostaApi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  /** Busca dados na API e atualiza o estado */
  const atualizar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const json = await buscarDados(local.lat, local.lon);
      setDados(json);
      setUltimaAtualizacao(new Date());
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }, [local]);

  // Busca dados ao montar e ao trocar de cidade
  useEffect(() => { void atualizar(); }, [atualizar]);

  /* Dados derivados */
  const atuais: DadosAtuais | null = dados ? extrairDadosAtuais(dados) : null;
  const horarios: DadosHorarios[] = dados ? montarDadosHorarios(dados) : [];
  const diarios: DadosDiarios[] = dados ? montarDadosDiarios(dados) : [];

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${CORES.fundo} 0%, #0f1628 30%, #0d0d20 60%, #080818 100%)`,
      color: CORES.textoP,
      fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animação de rotação (usada no botão atualizar) */}
      <style>{`@keyframes girar { to { transform: rotate(360deg); } }`}</style>

      {/* Brilho ambiente decorativo */}
      <div style={{
        position: "fixed", top: -200, right: -200, width: 600, height: 600,
        background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: -300, left: -200, width: 500, height: 500,
        background: "radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px", position: "relative" }}>
        {/* Cabeçalho */}
        <Cabecalho
          local={local}
          aoTrocarLocal={setLocal}
          aoAtualizar={atualizar}
          carregando={carregando}
        />

        {/* Timestamp da última atualização */}
        {ultimaAtualizacao && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 20 }}>
            <Clock size={11} color={CORES.textoQ} />
            <span style={{ color: CORES.textoQ, fontSize: 11 }}>
              Atualizado: {ultimaAtualizacao.toLocaleTimeString("pt-BR")} · Fonte: Open-Meteo API
            </span>
          </div>
        )}

        {/* Mensagem de erro */}
        {erro && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 12, padding: 16, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span style={{ color: "#fca5a5", fontSize: 13 }}>Erro: {erro}. Tente novamente.</span>
          </div>
        )}

        {/* Loading inicial */}
        {carregando && !dados ? (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 400, flexDirection: "column", gap: 16,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: `3px solid ${CORES.borda}`, borderTopColor: CORES.solar,
              animation: "girar 1s linear infinite",
            }} />
            <span style={{ color: CORES.textoT, fontSize: 14 }}>Carregando dados solares...</span>
          </div>
        ) : dados && atuais ? (
          <>
            {/* Linha 1: métricas de irradiância e temperatura */}
            <div style={gridPrincipal}>
              <CardEstatistica
                icone={Thermometer} rotulo="Temperatura"
                valor={atuais.temperatura.toFixed(1)} unidade="°C"
                cor={CORES.temperatura}
                detalhe={`Sensação: ${atuais.sensacaoTermica.toFixed(1)}°C`}
              />
              <CardEstatistica
                icone={Sun} rotulo="GHI (Global)"
                valor={atuais.ghi.toFixed(0)} unidade="W/m²"
                cor={CORES.solar}
                detalhe="Irradiância Global Horizontal"
              />
              <CardEstatistica
                icone={Zap} rotulo="DNI (Direta)"
                valor={atuais.dni.toFixed(0)} unidade="W/m²"
                cor={CORES.direta}
                detalhe="Irradiância Normal Direta"
              />
              <CardEstatistica
                icone={Eye} rotulo="DHI (Difusa)"
                valor={atuais.dhi.toFixed(0)} unidade="W/m²"
                cor={CORES.difusa}
                detalhe="Irradiância Horizontal Difusa"
              />
            </div>

            {/* Linha 2: métricas secundárias + gauge UV */}
            <div style={{ ...gridPrincipal, marginBottom: 20 }}>
              <CardEstatistica
                icone={Droplets} rotulo="Umidade"
                valor={atuais.umidade.toFixed(0)} unidade="%"
                cor={CORES.umidade}
              />
              <CardEstatistica
                icone={Wind} rotulo="Vento"
                valor={atuais.vento.toFixed(1)} unidade="km/h"
                cor={CORES.vento}
              />
              <CardEstatistica
                icone={CloudRain} rotulo="Precipitação"
                valor={atuais.precipitacao.toFixed(1)} unidade="mm"
                cor={CORES.chuva}
              />
              <GaugeUv valor={atuais.uv} />
            </div>

            {/* Linha 3: gráficos de irradiância e temperatura */}
            <div style={gridGraficos}>
              <GraficoIrradiancia dados={horarios} />
              <GraficoTemperatura dados={horarios} />
            </div>

            {/* Linha 4: gráficos de UV e precipitação */}
            <div style={{ ...gridGraficos, marginBottom: 20 }}>
              <GraficoUv dados={horarios} />
              <GraficoPrecipitacao dados={horarios} />
            </div>

            {/* Linha 5: previsão de 7 dias */}
            <SecaoGrafico titulo="Previsão 7 dias" icone={Calendar} cor={CORES.solar}>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                {diarios.map((d, i) => (
                  <CardDiario key={i} {...d} />
                ))}
              </div>
            </SecaoGrafico>

            {/* Rodapé */}
            <div style={{
              marginTop: 24, padding: "16px 0",
              borderTop: `1px solid ${CORES.borda}`,
              display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: 8,
            }}>
              <span style={{ color: "#334155", fontSize: 11 }}>
                Solar Dashboard · Dados: Open-Meteo API (gratuita, sem chave)
              </span>
              <span style={{ color: "#334155", fontSize: 11 }}>
                Desenvolvido por Carlos Gabriel dos Santos Modesto
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
