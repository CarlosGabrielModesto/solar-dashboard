/** Representa uma cidade disponível para consulta */
export interface Local {
  nome: string;
  lat: number;
  lon: number;
}

/** Cidades brasileiras com latitude e longitude para a API Open-Meteo */
export const LOCAIS: Local[] = [
  { nome: "Botucatu, SP", lat: -22.8859, lon: -48.4449 },
  { nome: "São Paulo, SP", lat: -23.5505, lon: -46.6333 },
  { nome: "Rio de Janeiro, RJ", lat: -22.9068, lon: -43.1729 },
  { nome: "Brasília, DF", lat: -15.7975, lon: -47.8919 },
  { nome: "Recife, PE", lat: -8.0476, lon: -34.877 },
];
