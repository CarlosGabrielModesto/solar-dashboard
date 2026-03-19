import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Sun } from "lucide-react";
import { CORES } from "../constants/cores";
import type { DadosHorarios } from "../services/api";
import SecaoGrafico from "../components/SecaoGrafico";
import LegendaGrafico from "../components/LegendaGrafico";
import TooltipPersonalizado from "../components/TooltipPersonalizado";

interface Props {
  dados: DadosHorarios[];
}

/** Configuração dos eixos (compartilhada entre gráficos) */
const eixoConfig = {
  tick: { fill: CORES.textoQ, fontSize: 10 },
  axisLine: false,
  tickLine: false,
};

/** Gráfico de irradiância solar (GHI, DNI, DHI) ao longo do dia */
export default function GraficoIrradiancia({ dados }: Props) {
  return (
    <SecaoGrafico titulo="Irradiância solar hoje (W/m²)" icone={Sun} cor={CORES.solar}>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={dados} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="grad_ghi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CORES.solar} stopOpacity={0.35} />
                <stop offset="95%" stopColor={CORES.solar} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad_dni" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CORES.direta} stopOpacity={0.25} />
                <stop offset="95%" stopColor={CORES.direta} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad_dhi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CORES.difusa} stopOpacity={0.25} />
                <stop offset="95%" stopColor={CORES.difusa} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hora" {...eixoConfig} interval={3} />
            <YAxis {...eixoConfig} />
            <Tooltip content={<TooltipPersonalizado sufixo=" W/m²" />} />
            <Area
              type="monotone" dataKey="ghi" name="GHI"
              stroke={CORES.solar} fill="url(#grad_ghi)" strokeWidth={2} dot={false}
            />
            <Area
              type="monotone" dataKey="dni" name="DNI"
              stroke={CORES.direta} fill="url(#grad_dni)" strokeWidth={1.5} dot={false}
            />
            <Area
              type="monotone" dataKey="dhi" name="DHI"
              stroke={CORES.difusa} fill="url(#grad_dhi)" strokeWidth={1.5} dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <LegendaGrafico itens={[
        { rotulo: "GHI (Global)", cor: CORES.solar },
        { rotulo: "DNI (Direta)", cor: CORES.direta },
        { rotulo: "DHI (Difusa)", cor: CORES.difusa },
      ]} />
    </SecaoGrafico>
  );
}
