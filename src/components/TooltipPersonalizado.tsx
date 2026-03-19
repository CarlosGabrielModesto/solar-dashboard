import type { TooltipProps } from "recharts";
import { CORES } from "../constants/cores";

interface Props extends TooltipProps<number, string> {
  sufixo?: string;
}

/** Tooltip customizado para todos os gráficos Recharts */
export default function TooltipPersonalizado({ active, payload, label, sufixo }: Props) {
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "rgba(10,10,20,0.95)",
      border: `1px solid ${CORES.borda}`,
      borderRadius: 10,
      padding: "10px 14px",
      backdropFilter: "blur(12px)",
    }}>
      <p style={{ color: CORES.textoS, fontSize: 11, marginBottom: 6 }}>
        {label}
      </p>
      {payload.map((p, i) => (
        <p key={i} style={{
          color: p.color, fontSize: 13, fontWeight: 600, margin: "2px 0",
        }}>
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
          {sufixo ?? ""}
        </p>
      ))}
    </div>
  );
}
