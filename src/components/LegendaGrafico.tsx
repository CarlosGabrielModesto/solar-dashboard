import { CORES } from "../constants/cores";

interface ItemLegenda {
  rotulo: string;
  cor: string;
}

interface Props {
  itens: ItemLegenda[];
}

/** Legenda horizontal reutilizável para gráficos */
export default function LegendaGrafico({ itens }: Props) {
  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 4 }}>
      {itens.map((item) => (
        <div key={item.rotulo} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 3, background: item.cor,
          }} />
          <span style={{ color: CORES.textoT, fontSize: 11 }}>
            {item.rotulo}
          </span>
        </div>
      ))}
    </div>
  );
}
