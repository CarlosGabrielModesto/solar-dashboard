import { useState } from "react";
import { Sun, MapPin, RefreshCw } from "lucide-react";
import { CORES } from "../constants/cores";
import { LOCAIS, type Local } from "../constants/locais";

interface Props {
  local: Local;
  aoTrocarLocal: (local: Local) => void;
  aoAtualizar: () => void;
  carregando: boolean;
}

/** Cabeçalho do dashboard com logo, seletor de cidade e botão atualizar */
export default function Cabecalho({ local, aoTrocarLocal, aoAtualizar, carregando }: Props) {
  const [seletorAberto, setSeletorAberto] = useState(false);

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 28, flexWrap: "wrap", gap: 12,
    }}>
      {/* Logo e título */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `linear-gradient(135deg, ${CORES.solar}, ${CORES.temperatura})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px rgba(251,191,36,0.3)",
        }}>
          <Sun size={22} color="#0a0a1a" />
        </div>
        <div>
          <h1 style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            background: `linear-gradient(135deg, ${CORES.solar}, ${CORES.temperatura})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Solar Dashboard
          </h1>
          <p style={{ fontSize: 11, color: CORES.textoT, margin: 0, fontWeight: 500 }}>
            Monitoramento de Irradiância Solar & Clima
          </p>
        </div>
      </div>

      {/* Controles */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {/* Seletor de cidade */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setSeletorAberto(!seletorAberto)}
            style={{
              background: CORES.card, border: `1px solid ${CORES.borda}`, borderRadius: 10,
              padding: "8px 14px", color: "#e2e8f0", fontSize: 13, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <MapPin size={14} color={CORES.solar} />
            {local.nome}
          </button>

          {/* Dropdown */}
          {seletorAberto && (
            <div style={{
              position: "absolute", top: "100%", right: 0, marginTop: 6,
              background: "rgba(16,16,32,0.98)", border: `1px solid ${CORES.borda}`,
              borderRadius: 12, padding: 6, zIndex: 100, minWidth: 180,
              backdropFilter: "blur(20px)",
            }}>
              {LOCAIS.map((loc) => (
                <button
                  key={loc.nome}
                  onClick={() => { aoTrocarLocal(loc); setSeletorAberto(false); }}
                  style={{
                    width: "100%",
                    background: loc.nome === local.nome ? `${CORES.solar}18` : "transparent",
                    border: "none", borderRadius: 8, padding: "8px 12px",
                    color: "#e2e8f0", fontSize: 12, fontWeight: 500,
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  {loc.nome}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botão atualizar */}
        <button
          onClick={aoAtualizar}
          style={{
            background: CORES.card, border: `1px solid ${CORES.borda}`, borderRadius: 10,
            padding: "8px 12px", color: CORES.textoS, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500,
          }}
        >
          <RefreshCw
            size={13}
            style={carregando ? { animation: "girar 1s linear infinite" } : {}}
          />
          Atualizar
        </button>
      </div>
    </div>
  );
}
