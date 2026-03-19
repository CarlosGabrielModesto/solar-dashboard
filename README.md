# ☀️ Solar Dashboard

Painel interativo de monitoramento de irradiância solar e condições climáticas em tempo real, consumindo dados da API Open-Meteo.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6384)
![License](https://img.shields.io/badge/Licença-MIT-green)

---

## 📋 Sobre o Projeto

Dashboard que exibe as três componentes de irradiância solar (**GHI**, **DNI**, **DHI**), índice UV, temperatura, umidade, precipitação e velocidade do vento — com previsão de 7 dias para cidades brasileiras.

Desenvolvido como projeto de portfólio, conectando conhecimentos de **desenvolvimento front-end** com a área de pesquisa em **radiação solar e meteorologia**.

### Funcionalidades

- Dados meteorológicos e de irradiância em tempo real
- Gráfico de irradiância solar com as 3 componentes (GHI, DNI, DHI)
- Gráfico de temperatura e umidade relativa (dois eixos Y)
- Gráfico de índice UV ao longo do dia
- Gráfico de precipitação horária
- Gauge visual do índice UV com classificação da OMS
- Previsão de 7 dias com resumo por card
- Seletor de 5 cidades brasileiras
- Atualização manual dos dados
- Design responsivo (desktop e mobile)

---

## 🔬 Fórmulas e Conversões Utilizadas

O dashboard exibe a maioria dos valores **diretamente como a API retorna**, sem transformação. As únicas conversões são:

### 1. Energia solar diária: MJ/m² → kWh/m²

```
kWh/m² = MJ/m² ÷ 3,6
```

A API Open-Meteo retorna a radiação acumulada diária (`shortwave_radiation_sum`) em **MJ/m²**. Para exibir em **kWh/m²** (unidade mais intuitiva para energia), divide-se por 3,6 — pois **1 kWh = 3,6 MJ**.

**Onde é usada:** `src/utils/formatadores.ts` → função `mjParaKwh()`, consumida pelo componente `CardDiario`.

### 2. Barra visual do índice UV (apenas visual)

```
porcentagem = (índiceUV / 14) × 100
```

O valor 14 representa o topo prático da escala UV. Essa fórmula é usada **somente para calcular a largura da barra de progresso** no componente `GaugeUv`, não altera o valor exibido.

**Onde é usada:** `src/components/GaugeUv.tsx`

### Dados exibidos sem transformação

| Variável | Unidade | Campo na API |
|---|---|---|
| Irradiância Global (GHI) | W/m² | `shortwave_radiation` |
| Irradiância Direta (DNI) | W/m² | `direct_radiation` |
| Irradiância Difusa (DHI) | W/m² | `diffuse_radiation` |
| Temperatura | °C | `temperature_2m` |
| Sensação Térmica | °C | `apparent_temperature` |
| Umidade Relativa | % | `relative_humidity_2m` |
| Precipitação | mm | `precipitation` |
| Velocidade do Vento | km/h | `windspeed_10m` |
| Índice UV | adimensional | `uv_index` |

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 18** | Componentização e gerenciamento de estado |
| **TypeScript 5.5** | Tipagem estática com `strict: true` |
| **Vite 5** | Build tool e dev server |
| **Recharts 2** | Gráficos (AreaChart, LineChart, BarChart) |
| **Lucide React** | Ícones SVG |
| **Open-Meteo API** | Dados meteorológicos e de irradiância solar |
| **Google Fonts** | Tipografia (Outfit + DM Mono) |

---

## 🌐 API Utilizada

**Open-Meteo Forecast API**
- URL base: `https://api.open-meteo.com/v1/forecast`
- Gratuita para uso não-comercial
- Sem necessidade de chave de API
- Documentação: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

### Parâmetros consumidos

**Horários:** `temperature_2m`, `relative_humidity_2m`, `precipitation`, `shortwave_radiation`, `direct_radiation`, `diffuse_radiation`, `uv_index`, `windspeed_10m`, `apparent_temperature`

**Diários:** `temperature_2m_max`, `temperature_2m_min`, `precipitation_sum`, `uv_index_max`, `shortwave_radiation_sum`, `sunrise`, `sunset`

---

## 📂 Estrutura do Projeto

```
solar-dashboard/
├── package.json                  # Dependências e scripts
├── README.md                     # Documentação
├── vite.config.ts                # Configuração do Vite
├── tsconfig.json                 # Configuração do TypeScript (strict)
├── index.html                    # Entry point (carrega fontes)
├── .gitignore                    # node_modules, dist, .env
└── src/
    ├── main.tsx                  # ReactDOM.createRoot
    ├── App.tsx                   # Componente raiz
    ├── constants/
    │   ├── locais.ts             # Cidades com lat/lon + interface Local
    │   ├── faixasUv.ts           # Escala UV (OMS) + obterFaixaUv()
    │   └── cores.ts              # Paleta de cores centralizada
    ├── utils/
    │   └── formatadores.ts       # formatarHora, formatarData, mjParaKwh
    ├── services/
    │   └── api.ts                # buscarDados + transformações de dados
    ├── components/
    │   ├── Cabecalho.tsx         # Logo, seletor de cidade, atualizar
    │   ├── CardEstatistica.tsx   # Card de métrica individual
    │   ├── GaugeUv.tsx           # Indicador UV com barra gradiente
    │   ├── CardDiario.tsx        # Card de previsão diária
    │   ├── SecaoGrafico.tsx      # Container padrão para gráficos
    │   ├── LegendaGrafico.tsx    # Legenda reutilizável
    │   └── TooltipPersonalizado.tsx # Tooltip dos gráficos Recharts
    ├── graficos/
    │   ├── GraficoIrradiancia.tsx   # AreaChart: GHI, DNI, DHI
    │   ├── GraficoTemperatura.tsx   # LineChart: temp + umidade (2 eixos)
    │   ├── GraficoUv.tsx            # BarChart: índice UV por hora
    │   └── GraficoPrecipitacao.tsx   # BarChart: precipitação por hora
    └── pages/
        └── SolarDashboard.tsx    # Página principal (orquestra tudo)
```

### Princípios da organização

| Pasta | Responsabilidade |
|---|---|
| `constants/` | Dados que não mudam (cidades, cores, faixas UV) |
| `utils/` | Funções puras sem dependência de React |
| `services/` | Comunicação com APIs externas |
| `components/` | Peças visuais reutilizáveis |
| `graficos/` | Componentes específicos do Recharts |
| `pages/` | Telas que compõem os componentes |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/CarlosGabrielModesto/solar-dashboard.git
cd solar-dashboard

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Build para produção

```bash
npm run build
npm run preview
```

---

## 📊 Glossário de Termos Solares

| Sigla | Termo | Descrição |
|---|---|---|
| **GHI** | Global Horizontal Irradiance | Radiação solar total recebida em superfície horizontal |
| **DNI** | Direct Normal Irradiance | Componente direta da radiação, medida perpendicular aos raios |
| **DHI** | Diffuse Horizontal Irradiance | Componente difusa, espalhada pela atmosfera |
| **UV** | Ultravioleta | Índice que mede a intensidade da radiação ultravioleta |
| **W/m²** | Watts por metro quadrado | Unidade de irradiância (potência por área) |
| **kWh/m²** | Quilowatt-hora por metro quadrado | Unidade de energia acumulada por área |
| **MJ/m²** | Megajoules por metro quadrado | Unidade de energia acumulada por área |

---

## 📝 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.

---

**Desenvolvido por Carlos Gabriel dos Santos Modesto**
