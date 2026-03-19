import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Shield } from "lucide-react";
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

/** Gráfico de barras do índice UV ao longo do dia */
export default function GraficoUv({ dados }: Props) {
  return (
    <SecaoGrafico titulo="Índice UV ao longo do dia" icone={Shield} cor={CORES.uv}>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={dados} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hora" {...eixoConfig} interval={3} />
            <YAxis {...eixoConfig} />
            <Tooltip content={<TooltipPersonalizado />} />
            <Bar
              dataKey="uv" name="Índice UV"
              radius={[4, 4, 0, 0]} fill={CORES.uv} fillOpacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SecaoGrafico>
  );
}
