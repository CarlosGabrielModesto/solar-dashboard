/** Representa uma faixa de classificação do índice UV */
export interface FaixaUv {
  max: number;
  rotulo: string;
  cor: string;
  fundo: string;
}

/**
 * Classificação do índice UV conforme escala da OMS.
 * Cada faixa define o limite superior, rótulo e cores para texto e fundo.
 */
export const FAIXAS_UV: FaixaUv[] = [
  { max: 2, rotulo: "Baixo", cor: "#22c55e", fundo: "rgba(34,197,94,0.15)" },
  { max: 5, rotulo: "Moderado", cor: "#eab308", fundo: "rgba(234,179,8,0.15)" },
  { max: 7, rotulo: "Alto", cor: "#f97316", fundo: "rgba(249,115,22,0.15)" },
  { max: 10, rotulo: "Muito Alto", cor: "#ef4444", fundo: "rgba(239,68,68,0.15)" },
  { max: 99, rotulo: "Extremo", cor: "#a855f7", fundo: "rgba(168,85,247,0.15)" },
];

/** Retorna a faixa UV correspondente ao valor informado */
export function obterFaixaUv(valor: number): FaixaUv {
  return FAIXAS_UV.find((f) => valor <= f.max) ?? FAIXAS_UV[4]!;
}
