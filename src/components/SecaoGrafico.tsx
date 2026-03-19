import type { LucideIcon } from "lucide-react";
import { CORES } from "../constants/cores";
import { estiloCard } from "./CardEstatistica";

interface Props {
  titulo: string;
  icone: LucideIcon;
  cor?: string;
  children: React.ReactNode;
}

/** Container padrão para seções de gráfico (título + conteúdo) */
export default function SecaoGrafico({ titulo, icone: Icone, cor = CORES.solar, children }: Props) {
  return (
    <div style={{ ...estiloCard, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: `${cor}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icone size={15} color={cor} />
        </div>
        <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>
          {titulo}
        </span>
      </div>
      {children}
    </div>
  );
}
