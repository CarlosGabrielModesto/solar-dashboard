/** Paleta de cores do tema dark solar — centralizada para consistência */
export const CORES = {
  /* Fundo e cards */
  fundo: "#07070f",
  card: "rgba(22,22,38,0.75)",
  borda: "rgba(251,191,36,0.1)",
  bordaHover: "rgba(251,191,36,0.3)",

  /* Irradiância solar */
  solar: "#fbbf24",
  direta: "#fb923c",
  difusa: "#38bdf8",

  /* Métricas climáticas */
  temperatura: "#f97316",
  umidade: "#38bdf8",
  vento: "#a78bfa",
  chuva: "#22d3ee",
  uv: "#a855f7",

  /* Texto (do mais claro ao mais escuro) */
  textoP: "#f1f5f9",
  textoS: "#94a3b8",
  textoT: "#64748b",
  textoQ: "#475569",
} as const;

/** Tipo derivado automaticamente da paleta */
export type Cores = typeof CORES;
