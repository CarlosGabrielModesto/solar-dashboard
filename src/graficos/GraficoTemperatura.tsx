import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Thermometer } from "lucide-react";
import { CORES } from "../constants/cores";
import type { DadosHorarios } from "../services/api";
import SecaoGrafico from "../components/SecaoGrafico";
import LegendaGrafico from "../components/LegendaGrafico";
import TooltipPersonalizado from "../components/TooltipPersonalizado";

interface Props {
  dados: DadosHorarios[];
}

const eixoConfig = {
  tick: { fill: CORES.textoQ, fontSize: 10 },
  axisLine: false,
  tickLine: false,
};

/**
 * Gráfico de temperatura e umidade relativa ao longo do dia.
 * Usa dois eixos Y: esquerdo para temperatura (°C), direito para umidade (%).
 */
export default function GraficoTemperatura({ dados }: Props) {
  return (
    <SecaoGrafico titulo="Temperatura & umidade hoje" icone={Thermometer} cor={CORES.temperatura}>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={dados} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hora" {...eixoConfig} interval={3} />
            <YAxis yAxisId="temp" {...eixoConfig} />
            <YAxis yAxisId="umid" orientation="right" {...eixoConfig} domain={[0, 100]} />
            <Tooltip content={<TooltipPersonalizado />} />
            <Line
              yAxisId="temp" type="monotone" dataKey="temperatura"
              name="Temp (°C)" stroke={CORES.temperatura} strokeWidth={2} dot={false}
            />
            <Line
              yAxisId="umid" type="monotone" dataKey="umidade"
              name="Umidade (%)" stroke={CORES.umidade} strokeWidth={1.5}
              dot={false} strokeDasharray="4 4"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <LegendaGrafico itens={[
        { rotulo: "Temperatura (°C)", cor: CORES.temperatura },
        { rotulo: "Umidade (%)", cor: CORES.umidade },
      ]} />
    </SecaoGrafico>
  );
}
