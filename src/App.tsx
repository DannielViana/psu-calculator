import { useState, useMemo } from 'react';
import {
  Cpu,
  MonitorPlay,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Fan,
  Zap,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import type { SelectedBuild } from './types/hardware';
import { CPUS, GPUS, MOTHERBOARDS, RAMS, STORAGES, COOLINGS } from './data/hardwareCatalog';
import { calculatePsuRecommendation } from './utils/psuCalculator';

const INITIAL_BUILD: SelectedBuild = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  cooling: null,
};

export function App() {
  const [build, setBuild] = useState<SelectedBuild>(INITIAL_BUILD);

  // Recalcula automaticamente sempre que qualquer peça muda
  const result = useMemo(() => calculatePsuRecommendation(build), [build]);

  const handleReset = () => setBuild(INITIAL_BUILD);

  const getLoadColor = (percentage: number) => {
    if (percentage === 0) return 'bg-slate-600';
    if (percentage <= 70) return 'bg-emerald-500';
    if (percentage <= 85) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-white">
              <Zap className="text-amber-400 w-7 h-7" />
              Calculadora de Fonte (PSU)
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Selecione as peças do seu PC para calcular o consumo real e a potência recomendada.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition cursor-pointer self-start"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar montagem
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda: Seletores de Peças */}
          <div className="lg:col-span-2 space-y-4">
            {/* CPU */}
            <ComponentSelector
              icon={<Cpu className="w-5 h-5 text-sky-400" />}
              label="Processador (CPU)"
              watts={build.cpu?.tdpWatts}
              value={build.cpu?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({ ...prev, cpu: CPUS.find((c) => c.id === id) ?? null }))
              }
              options={CPUS.map((c) => ({
                id: c.id,
                label: `${c.brand} ${c.name} (${c.socket}) — ${c.tdpWatts}W`,
              }))}
            />

            {/* GPU */}
            <ComponentSelector
              icon={<MonitorPlay className="w-5 h-5 text-purple-400" />}
              label="Placa de Vídeo (GPU)"
              watts={build.gpu?.tdpWatts}
              value={build.gpu?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({ ...prev, gpu: GPUS.find((g) => g.id === id) ?? null }))
              }
              options={GPUS.map((g) => ({
                id: g.id,
                label: `${g.brand} ${g.name} — ${g.tdpWatts}W`,
              }))}
            />

            {/* Placa-mãe */}
            <ComponentSelector
              icon={<CircuitBoard className="w-5 h-5 text-emerald-400" />}
              label="Placa-Mãe"
              watts={build.motherboard?.tdpWatts}
              value={build.motherboard?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({
                  ...prev,
                  motherboard: MOTHERBOARDS.find((m) => m.id === id) ?? null,
                }))
              }
              options={MOTHERBOARDS.map((m) => ({
                id: m.id,
                label: `${m.brand} ${m.name} (${m.socket} / ${m.ramType}) — ${m.tdpWatts}W`,
              }))}
            />

            {/* Memória RAM */}
            <ComponentSelector
              icon={<MemoryStick className="w-5 h-5 text-amber-400" />}
              label="Memória RAM"
              watts={build.ram?.tdpWatts}
              value={build.ram?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({ ...prev, ram: RAMS.find((r) => r.id === id) ?? null }))
              }
              options={RAMS.map((r) => ({
                id: r.id,
                label: `${r.brand} ${r.name} — ${r.tdpWatts}W`,
              }))}
            />

            {/* Armazenamento */}
            <ComponentSelector
              icon={<HardDrive className="w-5 h-5 text-rose-400" />}
              label="Armazenamento"
              watts={build.storage?.tdpWatts}
              value={build.storage?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({
                  ...prev,
                  storage: STORAGES.find((s) => s.id === id) ?? null,
                }))
              }
              options={STORAGES.map((s) => ({
                id: s.id,
                label: `${s.brand} ${s.name} — ${s.tdpWatts}W`,
              }))}
            />

            {/* Refrigeração */}
            <ComponentSelector
              icon={<Fan className="w-5 h-5 text-cyan-400" />}
              label="Refrigeração (Cooler)"
              watts={build.cooling?.tdpWatts}
              value={build.cooling?.id ?? ''}
              onChange={(id) =>
                setBuild((prev) => ({
                  ...prev,
                  cooling: COOLINGS.find((c) => c.id === id) ?? null,
                }))
              }
              options={COOLINGS.map((c) => ({
                id: c.id,
                label: `${c.brand} ${c.name} — ${c.tdpWatts}W`,
              }))}
            />
          </div>

          {/* Coluna da Direita: Painel de Resultado em Tempo Real */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Fonte Recomendada
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-amber-400">
                    {result.totalBaseWatts > 0 ? `${result.suggestedPsuTier}W` : '---'}
                  </span>
                  {result.totalBaseWatts > 0 && (
                    <span className="text-sm text-slate-400">80 Plus Bronze/Gold</span>
                  )}
                </div>
              </div>

              {/* Detalhamento numérico */}
              <div className="space-y-3 border-t border-slate-800 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Consumo base estimado:</span>
                  <span className="font-semibold text-white">{result.totalBaseWatts} W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Com margem de segurança (+30%):</span>
                  <span className="font-semibold text-white">{result.recommendedWatts} W</span>
                </div>
              </div>

              {/* Barra de Carga da Fonte */}
              {result.totalBaseWatts > 0 && (
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Carga estimada da fonte</span>
                    <span className="font-semibold text-slate-200">{result.loadPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getLoadColor(result.loadPercentage)}`}
                      style={{ width: `${Math.min(result.loadPercentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Fontes operam com eficiência máxima entre 50% e 70% de carga.
                  </p>
                </div>
              )}

              {/* Alertas e Compatibilidade */}
              {result.warnings.length > 0 && (
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  {result.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Componente auxiliar para cada linha de seleção */
interface ComponentSelectorProps {
  icon: React.ReactNode;
  label: string;
  watts?: number;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}

function ComponentSelector({
  icon,
  label,
  watts,
  value,
  onChange,
  options,
}: ComponentSelectorProps) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-[190px]">
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
        <div>
          <label className="block text-sm font-medium text-slate-200">{label}</label>
          <span className="text-xs text-slate-400">
            {watts !== undefined ? `Consumo: ${watts}W` : 'Nenhuma selecionada'}
          </span>
        </div>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
      >
        <option value="">-- Selecione --</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;