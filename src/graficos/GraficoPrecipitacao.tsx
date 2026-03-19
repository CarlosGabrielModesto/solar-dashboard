import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CloudRain } from "lucide-react";
import { CORES } from "../constants/cores";
import type { DadosHorarios } from "../services/api";
import SecaoGrafico from "../components/SecaoGrafico";
import TooltipPersonalizado from "../components/TooltipPersonalizado";

interface Props {
  dados: DadosHorarios[];
}

const eixoConfig = {
  tick: { fill: CORES.textoQ, fontSize: 10 },
  axisLine: false,
  tickLine: false,
};

/** Gráfico de barras de precipitação horária (mm) */
export default function GraficoPrecipitacao({ dados }: Props) {
  return (
    <SecaoGrafico titulo="Precipitação horária (mm)" icone={CloudRain} cor={CORES.chuva}>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={dados} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hora" {...eixoConfig} interval={3} />
            <YAxis {...eixoConfig} />
            <Tooltip content={<TooltipPersonalizado sufixo=" mm" />} />
            <Bar
              dataKey="precipitacao" name="Precipitação"
              radius={[4, 4, 0, 0]} fill={CORES.chuva} fillOpacity={0.6}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SecaoGrafico>
  );
}
