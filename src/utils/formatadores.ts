/** Formata string ISO para horário "HH:mm" em pt-BR */
export function formatarHora(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Formata string ISO para data curta: "seg., 19 de mar." */
export function formatarData(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

/**
 * Converte energia solar diária de MJ/m² para kWh/m².
 * Fórmula: kWh = MJ ÷ 3,6  (pois 1 kWh = 3,6 MJ)
 */
export function mjParaKwh(mj: number): number {
  return mj / 3.6;
}
