import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CORES } from "../constants/cores";

interface Props {
  icone: LucideIcon;
  rotulo: string;
  valor: string;
  unidade: string;
  cor: string;
  detalhe?: string;
}

/** Estilo base compartilhado entre cards */
export const estiloCard: React.CSSProperties = {
  background: `linear-gradient(145deg, ${CORES.card}, rgba(14,14,28,0.6))`,
  border: `1px solid ${CORES.borda}`,
  borderRadius: 16,
  padding: "20px 22px",
};

/** Card de métrica individual (ex: temperatura, GHI, umidade) */
export default function CardEstatistica({ icone: Icone, rotulo, valor, unidade, cor, detalhe }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...estiloCard,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        border: hover ? `1px solid ${cor}40` : `1px solid ${CORES.borda}`,
        transform: hover ? "translateY(-2px)" : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Rótulo com ícone */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: `${cor}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icone size={17} color={cor} />
        </div>
        <span style={{
          color: CORES.textoS, fontSize: 12, fontWeight: 500,
          letterSpacing: 0.5, textTransform: "uppercase",
        }}>
          {rotulo}
        </span>
      </div>

      {/* Valor principal */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span style={{
          color: CORES.textoP, fontSize: 28, fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
        }}>
          {valor}
        </span>
        <span style={{ color: CORES.textoT, fontSize: 13, fontWeight: 500 }}>
          {unidade}
        </span>
      </div>

      {/* Detalhe opcional (ex: sensação térmica) */}
      {detalhe && (
        <span style={{ color: CORES.textoT, fontSize: 11 }}>{detalhe}</span>
      )}
    </div>
  );
}
