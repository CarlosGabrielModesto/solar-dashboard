import { formatarHora, formatarData } from "../utils/formatadores";

/* ========================================================================
   TIPOS — Resposta da API Open-Meteo
   ======================================================================== */

/** Estrutura dos dados horários retornados pela API */
interface DadosHorariosApi {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  shortwave_radiation: number[];
  direct_radiation: number[];
  diffuse_radiation: number[];
  uv_index: number[];
  windspeed_10m: number[];
}

/** Estrutura dos dados diários retornados pela API */
interface DadosDiariosApi {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  uv_index_max: number[];
  shortwave_radiation_sum: number[];
  sunrise: string[];
  sunset: string[];
}

/** Resposta completa da API Open-Meteo */
export interface RespostaApi {
  hourly: DadosHorariosApi;
  daily: DadosDiariosApi;
}

/* ========================================================================
   TIPOS — Dados transformados para os componentes
   ======================================================================== */

/** Dados do momento atual (hora corrente) */
export interface DadosAtuais {
  temperatura: number;
  sensacaoTermica: number;
  umidade: number;
  precipitacao: number;
  ghi: number;
  dni: number;
  dhi: number;
  uv: number;
  vento: number;
}

/** Dados de uma hora específica para os gráficos */
export interface DadosHorarios {
  hora: string;
  temperatura: number;
  umidade: number;
  ghi: number;
  dni: number;
  dhi: number;
  uv: number;
  precipitacao: number;
}

/** Dados de um dia para a previsão de 7 dias */
export interface DadosDiarios {
  data: string;
  tempMax: number;
  tempMin: number;
  precipitacao: number;
  uvMax: number;
  radiacaoDiaria: number;
}

/* ========================================================================
   BUSCA DE DADOS
   ======================================================================== */

/**
 * Busca dados meteorológicos e de irradiância na API Open-Meteo.
 * API gratuita, sem necessidade de chave.
 *
 * Parâmetros horários: temperatura, umidade, precipitação, irradiância
 *   (GHI, DNI, DHI), índice UV, vento, sensação térmica.
 * Parâmetros diários: temperaturas extremas, precipitação acumulada,
 *   UV máximo, radiação acumulada (MJ/m²), nascer e pôr do sol.
 */
export async function buscarDados(lat: number, lon: number): Promise<RespostaApi> {
  const horarios = [
    "temperature_2m",
    "relative_humidity_2m",
    "precipitation",
    "shortwave_radiation",
    "direct_radiation",
    "diffuse_radiation",
    "uv_index",
    "windspeed_10m",
    "apparent_temperature",
  ].join(",");

  const diarios = [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "uv_index_max",
    "shortwave_radiation_sum",
    "sunrise",
    "sunset",
  ].join(",");

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&hourly=${horarios}` +
    `&daily=${diarios}` +
    `&timezone=America/Sao_Paulo` +
    `&forecast_days=7`;

  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

  return resposta.json() as Promise<RespostaApi>;
}

/* ========================================================================
   TRANSFORMAÇÃO DE DADOS
   ======================================================================== */

/**
 * Extrai os valores da hora atual a partir dos dados horários da API.
 * Retorna null se a hora atual não for encontrada.
 */
export function extrairDadosAtuais(dados: RespostaApi): DadosAtuais | null {
  const agora = new Date();
  const indice = dados.hourly.time.findIndex((t) => {
    const d = new Date(t);
    return (
      d.getFullYear() === agora.getFullYear() &&
      d.getMonth() === agora.getMonth() &&
      d.getDate() === agora.getDate() &&
      d.getHours() === agora.getHours()
    );
  });

  if (indice < 0) return null;

  const h = dados.hourly;
  return {
    temperatura: h.temperature_2m[indice]!,
    sensacaoTermica: h.apparent_temperature[indice]!,
    umidade: h.relative_humidity_2m[indice]!,
    precipitacao: h.precipitation[indice]!,
    ghi: h.shortwave_radiation[indice]!,
    dni: h.direct_radiation[indice]!,
    dhi: h.diffuse_radiation[indice]!,
    uv: h.uv_index[indice]!,
    vento: h.windspeed_10m[indice]!,
  };
}

/**
 * Monta array com dados horários do dia atual para os gráficos.
 * Retorna 24 registros (um por hora) com métricas formatadas.
 */
export function montarDadosHorarios(dados: RespostaApi): DadosHorarios[] {
  const agora = new Date();
  const inicio = dados.hourly.time.findIndex((t) => {
    const d = new Date(t);
    return d.getDate() === agora.getDate() && d.getMonth() === agora.getMonth();
  });

  if (inicio < 0) return [];

  const h = dados.hourly;
  return h.time.slice(inicio, inicio + 24).map((t, i) => ({
    hora: formatarHora(t),
    temperatura: h.temperature_2m[inicio + i]!,
    umidade: h.relative_humidity_2m[inicio + i]!,
    ghi: h.shortwave_radiation[inicio + i]!,
    dni: h.direct_radiation[inicio + i]!,
    dhi: h.diffuse_radiation[inicio + i]!,
    uv: h.uv_index[inicio + i]!,
    precipitacao: h.precipitation[inicio + i]!,
  }));
}

/**
 * Monta array com dados diários para a previsão de 7 dias.
 * A radiação diária é mantida em MJ/m² — a conversão para kWh/m²
 * ocorre na renderização (componente CardDiario).
 */
export function montarDadosDiarios(dados: RespostaApi): DadosDiarios[] {
  const d = dados.daily;
  return d.time.map((t, i) => ({
    data: formatarData(t),
    tempMax: d.temperature_2m_max[i]!,
    tempMin: d.temperature_2m_min[i]!,
    precipitacao: d.precipitation_sum[i]!,
    uvMax: d.uv_index_max[i]!,
    radiacaoDiaria: d.shortwave_radiation_sum[i]!,
  }));
}
