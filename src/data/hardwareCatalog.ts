import type {
  CPUComponent,
  GPUComponent,
  MotherboardComponent,
  RAMComponent,
  StorageComponent,
  CoolingComponent,
} from '../types/hardware';

export const CPUS: CPUComponent[] = [
  { id: 'r5-5600', name: 'Ryzen 5 5600', brand: 'AMD', category: 'CPU', socket: 'AM4', tdpWatts: 65 },
  { id: 'r7-5700x3d', name: 'Ryzen 7 5700X3D', brand: 'AMD', category: 'CPU', socket: 'AM4', tdpWatts: 105 },
  { id: 'r5-7600', name: 'Ryzen 5 7600', brand: 'AMD', category: 'CPU', socket: 'AM5', tdpWatts: 65 },
  { id: 'r7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', category: 'CPU', socket: 'AM5', tdpWatts: 120 },
  { id: 'i5-13400f', name: 'Core i5-13400F', brand: 'Intel', category: 'CPU', socket: 'LGA1700', tdpWatts: 148 },
  { id: 'i7-14700k', name: 'Core i7-14700K', brand: 'Intel', category: 'CPU', socket: 'LGA1700', tdpWatts: 253 },
];

export const GPUS: GPUComponent[] = [
  { id: 'rx-6600', name: 'Radeon RX 6600 8GB', brand: 'AMD', category: 'GPU', tdpWatts: 132, minRecommendedPsu: 450 },
  { id: 'rtx-4060', name: 'GeForce RTX 4060 8GB', brand: 'NVIDIA', category: 'GPU', tdpWatts: 115, minRecommendedPsu: 550 },
  { id: 'rx-7700-xt', name: 'Radeon RX 7700 XT 12GB', brand: 'AMD', category: 'GPU', tdpWatts: 245, minRecommendedPsu: 700 },
  { id: 'rtx-4070-super', name: 'GeForce RTX 4070 Super 12GB', brand: 'NVIDIA', category: 'GPU', tdpWatts: 220, minRecommendedPsu: 650 },
  { id: 'rtx-4080-super', name: 'GeForce RTX 4080 Super 16GB', brand: 'NVIDIA', category: 'GPU', tdpWatts: 320, minRecommendedPsu: 750 },
  { id: 'rtx-4090', name: 'GeForce RTX 4090 24GB', brand: 'NVIDIA', category: 'GPU', tdpWatts: 450, minRecommendedPsu: 850 },
];

export const MOTHERBOARDS: MotherboardComponent[] = [
  { id: 'b550m-pro', name: 'B550M Pro-VDH WiFi', brand: 'MSI', category: 'Motherboard', socket: 'AM4', ramType: 'DDR4', tdpWatts: 35 },
  { id: 'b650-gaming', name: 'B650 Gaming Plus WiFi', brand: 'MSI', category: 'Motherboard', socket: 'AM5', ramType: 'DDR5', tdpWatts: 45 },
  { id: 'b760m-aorus', name: 'B760M AORUS Elite', brand: 'Gigabyte', category: 'Motherboard', socket: 'LGA1700', ramType: 'DDR5', tdpWatts: 50 },
  { id: 'z790-tomahawk', name: 'MAG Z790 Tomahawk', brand: 'MSI', category: 'Motherboard', socket: 'LGA1700', ramType: 'DDR5', tdpWatts: 65 },
];

export const RAMS: RAMComponent[] = [
  { id: '16gb-ddr4', name: '16GB (2x8GB) DDR4 3200MHz', brand: 'Kingston', category: 'RAM', ramType: 'DDR4', modules: 2, tdpWatts: 6 },
  { id: '32gb-ddr4', name: '32GB (2x16GB) DDR4 3600MHz', brand: 'Corsair', category: 'RAM', ramType: 'DDR4', modules: 2, tdpWatts: 8 },
  { id: '32gb-ddr5', name: '32GB (2x16GB) DDR5 6000MHz', brand: 'Corsair', category: 'RAM', ramType: 'DDR5', modules: 2, tdpWatts: 10 },
  { id: '64gb-ddr5', name: '64GB (2x32GB) DDR5 6000MHz', brand: 'G.Skill', category: 'RAM', ramType: 'DDR5', modules: 2, tdpWatts: 14 },
];

export const STORAGES: StorageComponent[] = [
  { id: 'nvme-1tb', name: 'SSD NVMe M.2 1TB', brand: 'Kingston', category: 'Storage', type: 'NVMe', tdpWatts: 5 },
  { id: 'nvme-2tb', name: 'SSD NVMe M.2 2TB Gen4', brand: 'Samsung', category: 'Storage', type: 'NVMe', tdpWatts: 8 },
  { id: 'sata-1tb', name: 'SSD SATA 2.5" 1TB', brand: 'Crucial', category: 'Storage', type: 'SATA SSD', tdpWatts: 4 },
  { id: 'hdd-2tb', name: 'HD 3.5" 7200RPM 2TB', brand: 'Seagate', category: 'Storage', type: 'HDD', tdpWatts: 10 },
];

export const COOLINGS: CoolingComponent[] = [
  { id: 'air-cooler', name: 'Air Cooler Torre 120mm', brand: 'DeepCool', category: 'Cooling', type: 'Air Cooler', tdpWatts: 5 },
  { id: 'aio-240', name: 'Water Cooler 240mm ARGB', brand: 'Cooler Master', category: 'Cooling', type: 'Water Cooler 240mm', tdpWatts: 15 },
  { id: 'aio-360', name: 'Water Cooler 360mm', brand: 'Corsair', category: 'Cooling', type: 'Water Cooler 360mm', tdpWatts: 22 },
];