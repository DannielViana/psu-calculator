export type ComponentCategory = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'Cooling';

interface BaseComponent {
  id: string;
  name: string;
  brand: string;
  tdpWatts: number;
}

export type CPUComponent = BaseComponent & {
  category: 'CPU';
  socket: 'AM4' | 'AM5' | 'LGA1700' | 'LGA1851';
};

export type GPUComponent = BaseComponent & {
  category: 'GPU';
  minRecommendedPsu: number; // Trava mínima exigida pela fabricante
};

export type MotherboardComponent = BaseComponent & {
  category: 'Motherboard';
  socket: 'AM4' | 'AM5' | 'LGA1700' | 'LGA1851';
  ramType: 'DDR4' | 'DDR5';
};

export type RAMComponent = BaseComponent & {
  category: 'RAM';
  ramType: 'DDR4' | 'DDR5';
  modules: number;
};

export type StorageComponent = BaseComponent & {
  category: 'Storage';
  type: 'NVMe' | 'SATA SSD' | 'HDD';
};

export type CoolingComponent = BaseComponent & {
  category: 'Cooling';
  type: 'Air Cooler' | 'Water Cooler 240mm' | 'Water Cooler 360mm';
};

export type HardwareComponent =
  | CPUComponent
  | GPUComponent
  | MotherboardComponent
  | RAMComponent
  | StorageComponent
  | CoolingComponent;

export interface SelectedBuild {
  cpu: CPUComponent | null;
  gpu: GPUComponent | null;
  motherboard: MotherboardComponent | null;
  ram: RAMComponent | null;
  storage: StorageComponent | null;
  cooling: CoolingComponent | null;
}

export interface CalculationResult {
  totalBaseWatts: number;
  recommendedWatts: number;
  suggestedPsuTier: number; // Ex: 550, 650, 750, 850, 1000, 1200
  loadPercentage: number;   // Porcentagem de carga na fonte sugerida
  warnings: string[];       // Alertas de compatibilidade ou picos de energia
}