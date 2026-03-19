import { useState } from "react";
import { ArrowUp, ArrowDown, Droplets, Sun, Zap } from "lucide-react";
import { CORES } from "../constants/cores";
import { obterFaixaUv } from "../constants/faixasUv";
import { mjParaKwh } from "../utils/formatadores";
import { estiloCard } from "./CardEstatistica";
import type { DadosDiarios } from "../services/api";

type Props = DadosDiarios;

/** Card compacto com resumo de um dia da previsão */
export default function CardDiario({ data, tempMax, tempMin, precipitacao, uvMax, radiacaoDiaria }: Props) {
  const faixaUv = obterFaixaUv(uvMax);
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...estiloCard,
        minWidth: 155,
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transform: hover ? "translateY(-3px)" : "none",
        borderColor: hover ? CORES.bordaHover : CORES.borda,
        transition: "all 0.3s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Data */}
      <span style={{
        color: CORES.textoS, fontSize: 12, fontWeight: 600, textTransform: "capitalize",
      }}>
        {data}
      </span>

      {/* Temperaturas máxima e mínima */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ArrowUp size={13} color={CORES.temperatura} />
        <span style={{
          color: CORES.textoP, fontSize: 18, fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
        }}>
          {tempMax.toFixed(0)}°
        </span>
        <ArrowDown size={13} color={CORES.difusa} />
        <span style={{
          color: CORES.textoT, fontSize: 15, fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
        }}>
          {tempMin.toFixed(0)}°
        </span>
      </div>

      {/* Métricas resumidas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Droplets size={11} color={CORES.difusa} />
          <span style={{ color: CORES.textoT, fontSize: 11 }}>
            {precipitacao.toFixed(1)} mm
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Sun size={11} color={faixaUv.cor} />
          <span style={{ color: CORES.textoT, fontSize: 11 }}>
            UV {uvMax.toFixed(0)} · {faixaUv.rotulo}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Zap size={11} color={CORES.solar} />
          {/* Conversão: MJ/m² → kWh/m² (÷ 3,6) */}
          <span style={{ color: CORES.textoT, fontSize: 11 }}>
            {mjParaKwh(radiacaoDiaria).toFixed(1)} kWh/m²
          </span>
        </div>
      </div>
    </div>
  );
}
