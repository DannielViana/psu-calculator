import type { CalculationResult, SelectedBuild } from '../types/hardware';

const STANDARD_PSU_TIERS = [450, 500, 550, 600, 650, 750, 850, 1000, 1200, 1500];
const SAFETY_HEADROOM_MULTIPLIER = 1.3; // 30% de folga recomendada

export function calculatePsuRecommendation(build: SelectedBuild): CalculationResult {
  const warnings: string[] = [];
  
  // 1. Soma o consumo base de todas as peças selecionadas
  const components = Object.values(build).filter((item) => item !== null);
  const totalBaseWatts = components.reduce((acc, item) => acc + item.tdpWatts, 0);

  // 2. Validações bônus de compatibilidade
  if (build.cpu && build.motherboard && build.cpu.socket !== build.motherboard.socket) {
    warnings.push(
      `Incompatibilidade: O processador (${build.cpu.socket}) não encaixa na placa-mãe (${build.motherboard.socket}).`
    );
  }

  if (build.motherboard && build.ram && build.motherboard.ramType !== build.ram.ramType) {
    warnings.push(
      `Incompatibilidade: A placa-mãe aceita apenas memórias ${build.motherboard.ramType}, mas você escolheu ${build.ram.ramType}.`
    );
  }

  // 3. Aplica a margem de segurança de 30%
  let recommendedWatts = Math.ceil(totalBaseWatts * SAFETY_HEADROOM_MULTIPLIER);

  // 4. Verifica se a GPU exige uma fonte mínima superior ao cálculo
  if (build.gpu && build.gpu.minRecommendedPsu > recommendedWatts) {
    recommendedWatts = build.gpu.minRecommendedPsu;
    warnings.push(
      `Potência ajustada para ${build.gpu.minRecommendedPsu}W devido à recomendação oficial da ${build.gpu.name} para suportar picos de energia.`
    );
  }

  // 5. Encontra a fonte comercial ideal igual ou superior ao recomendado
  const suggestedPsuTier =
    STANDARD_PSU_TIERS.find((tier) => tier >= recommendedWatts) ||
    Math.ceil(recommendedWatts / 100) * 100;

  // 6. Calcula a porcentagem de uso da fonte em carga máxima
  const loadPercentage =
    totalBaseWatts > 0 ? Math.round((totalBaseWatts / suggestedPsuTier) * 100) : 0;

  return {
    totalBaseWatts,
    recommendedWatts,
    suggestedPsuTier,
    loadPercentage,
    warnings,
  };
}