import { Shield } from "lucide-react";
import { CORES } from "../constants/cores";
import { FAIXAS_UV, obterFaixaUv } from "../constants/faixasUv";
import { estiloCard } from "./CardEstatistica";

interface Props {
  valor: number;
}

/**
 * Indicador visual do índice UV com barra de progresso colorida.
 * A barra usa a fórmula: porcentagem = (valor / 14) × 100
 * onde 14 é o topo prático da escala UV. Apenas visual, não altera o valor.
 */
export default function GaugeUv({ valor }: Props) {
  const faixa = obterFaixaUv(valor);
  const porcentagem = Math.min((valor / 14) * 100, 100);

  return (
    <div style={{ ...estiloCard, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: `${faixa.cor}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Shield size={17} color={faixa.cor} />
        </div>
        <span style={{
          color: CORES.textoS, fontSize: 12, fontWeight: 500,
          letterSpacing: 0.5, textTransform: "uppercase",
        }}>
          Índice UV
        </span>
      </div>

      {/* Valor + badge da faixa */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{
          color: CORES.textoP, fontSize: 36, fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
        }}>
          {valor.toFixed(1)}
        </span>
        <span style={{
          color: faixa.cor, fontSize: 13, fontWeight: 600,
          background: faixa.fundo, padding: "3px 10px", borderRadius: 20,
        }}>
          {faixa.rotulo}
        </span>
      </div>

      {/* Barra de progresso com gradiente UV */}
      <div>
        <div style={{
          width: "100%", height: 8, borderRadius: 10, overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: `${porcentagem}%`,
            height: "100%",
            borderRadius: 10,
            background: "linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444, #a855f7)",
            transition: "width 1s ease",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ color: CORES.textoQ, fontSize: 10 }}>0</span>
          <span style={{ color: CORES.textoQ, fontSize: 10 }}>14+</span>
        </div>
      </div>

      {/* Legenda das faixas */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {FAIXAS_UV.map((f, i) => (
          <span key={i} style={{
            fontSize: 10, color: f.cor, background: f.fundo,
            padding: "2px 8px", borderRadius: 10, fontWeight: 500,
          }}>
            {f.rotulo}
          </span>
        ))}
      </div>
    </div>
  );
}
