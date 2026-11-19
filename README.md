# ⚡ Calculadora de Fonte (PSU Calculator)

Aplicação web interativa desenvolvida em **React + TypeScript** para calcular o consumo energético (TDP) de computadores personalizados, validar compatibilidade básica entre componentes e recomendar a fonte de alimentação (PSU) ideal com margem de segurança.

## 🚀 Funcionalidades

- **Cálculo em Tempo Real:** Soma o consumo individual de CPU, GPU, Placa-Mãe, RAM, Armazenamento e Refrigeração.
- **Margem de Segurança Inteligente:** Aplica automaticamente 30% de folga (*headroom*) para garantir eficiência energética e absorver picos transientes.
- **Trava de Fabricante:** Respeita a potência mínima exigida pelas fabricantes de placas de vídeo modernas.
- **Validação de Compatibilidade:** Alerta automaticamente sobre divergências de socket (CPU vs. Placa-Mãe) e geração de memória (DDR4 vs. DDR5).
- **Indicador Visual de Carga:** Barra dinâmica que mostra a porcentagem de utilização da fonte recomendada.

## 🛠️ Tecnologias Utilizadas

- **TypeScript** (Modelagem estrita com *Discriminated Unions*)
- **React 19 + Vite**
- **Tailwind CSS**
- **Lucide React** (Ícones)

## 📦 Como rodar localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/SEU-USUARIO/psu-calculator.git](https://github.com/SEU-USUARIO/psu-calculator.git)

# 2. Acesse a pasta do projeto
cd psu-calculator

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev