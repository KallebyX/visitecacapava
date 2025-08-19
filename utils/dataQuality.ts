// Comando de limpeza de dados para manter apenas conteúdo de Caçapava do Sul (RS)
import { insideBBox, isCacapavaSP, isCacapavaDoSul } from './geolocation';

export interface TrashItem {
  id: string;
  originalData: any;
  reason: 'OUT_OF_MUNICIPALITY' | 'CACAPAVA_SP' | 'INVALID_COORDINATES' | 'DUPLICATE' | 'INVALID_CATEGORY';
  trashedAt: Date;
  originalTable: 'pois' | 'restaurants' | 'events' | 'routes';
}

export interface DataQualityReport {
  totalProcessed: number;
  kept: number;
  trashed: number;
  normalized: number;
  reasons: {
    [key: string]: number;
  };
  categories: {
    [key: string]: number;
  };
}

// Categorias válidas padronizadas
export const VALID_CATEGORIES = {
  pois: ['historia', 'natureza', 'gastronomia', 'familia'],
  restaurants: ['tradicional', 'contemporaneo', 'rapida', 'cafeteria'],
  events: ['cultural', 'esportivo', 'gastronomico', 'educativo']
};

/**
 * Função principal de limpeza - simula o comando yarn dq:purge-cacapava
 */
export async function purgeCacapavaData(): Promise<DataQualityReport> {
  console.log('🧹 Iniciando limpeza de dados para Caçapava do Sul (RS)...');
  
  const report: DataQualityReport = {
    totalProcessed: 0,
    kept: 0,
    trashed: 0,
    normalized: 0,
    reasons: {},
    categories: {}
  };
  
  // Simular limpeza de POIs
  const poiResults = await cleanPOIs();
  mergeReports(report, poiResults);
  
  // Simular limpeza de restaurantes
  const restaurantResults = await cleanRestaurants();
  mergeReports(report, restaurantResults);
  
  // Simular limpeza de eventos
  const eventResults = await cleanEvents();
  mergeReports(report, eventResults);
  
  console.log('✅ Limpeza concluída!');
  console.log(`📊 Relatório: ${report.kept} mantidos, ${report.trashed} removidos, ${report.normalized} normalizados`);
  
  return report;
}

/**
 * Limpeza específica de POIs
 */
async function cleanPOIs(): Promise<DataQualityReport> {
  // Simulação de dados existentes (em produção, seria query no banco)
  const mockPOIs = [
    {
      id: '1',
      name: 'Pedra do Segredo',
      lat: -30.5089,
      lng: -53.4821,
      category: 'Natural',
      address: 'Caçapava do Sul, RS'
    },
    {
      id: '2',
      name: 'Parque da Cidade',
      lat: -23.5505, // São Paulo
      lng: -46.6333,
      category: 'lazer',
      address: 'Caçapava, SP'
    },
    {
      id: '3',
      name: 'Forte Dom Pedro II',
      lat: -30.5156,
      lng: -53.4912,
      category: 'Histórico',
      address: 'Centro, Caçapava do Sul'
    }
  ];
  
  const report: DataQualityReport = {
    totalProcessed: mockPOIs.length,
    kept: 0,
    trashed: 0,
    normalized: 0,
    reasons: {},
    categories: {}
  };
  
  for (const poi of mockPOIs) {
    // Verificar se está fora do município
    if (!insideBBox(poi.lat, poi.lng)) {
      await trashItem(poi, 'OUT_OF_MUNICIPALITY', 'pois');
      report.trashed++;
      incrementReason(report.reasons, 'OUT_OF_MUNICIPALITY');
      continue;
    }
    
    // Verificar se é Caçapava (SP)
    if (isCacapavaSP(poi.name, poi.address)) {
      await trashItem(poi, 'CACAPAVA_SP', 'pois');
      report.trashed++;
      incrementReason(report.reasons, 'CACAPAVA_SP');
      continue;
    }
    
    // Normalizar categoria
    const normalizedCategory = normalizeCategory(poi.category, 'pois');
    if (normalizedCategory !== poi.category) {
      poi.category = normalizedCategory;
      report.normalized++;
    }
    
    report.kept++;
    incrementCategory(report.categories, poi.category);
  }
  
  return report;
}

/**
 * Limpeza específica de restaurantes
 */
async function cleanRestaurants(): Promise<DataQualityReport> {
  // Simulação similar aos POIs
  const mockRestaurants = [
    {
      id: '1',
      name: 'Restaurante do Gaúcho',
      lat: -30.5156,
      lng: -53.4912,
      category: 'Regional',
      address: 'Caçapava do Sul, RS'
    },
    {
      id: '2',
      name: 'Pizzaria São Paulo',
      lat: -23.5505,
      lng: -46.6333,
      category: 'italiana',
      address: 'Caçapava, SP'
    }
  ];
  
  return processItems(mockRestaurants, 'restaurants');
}

/**
 * Limpeza específica de eventos
 */
async function cleanEvents(): Promise<DataQualityReport> {
  const mockEvents = [
    {
      id: '1',
      name: 'Festival de Inverno',
      lat: -30.5156,
      lng: -53.4912,
      category: 'Cultural',
      address: 'Centro Cultural, Caçapava do Sul'
    }
  ];
  
  return processItems(mockEvents, 'events');
}

/**
 * Processa items de qualquer tipo
 */
function processItems(items: any[], type: 'pois' | 'restaurants' | 'events'): DataQualityReport {
  const report: DataQualityReport = {
    totalProcessed: items.length,
    kept: 0,
    trashed: 0,
    normalized: 0,
    reasons: {},
    categories: {}
  };
  
  for (const item of items) {
    if (!insideBBox(item.lat, item.lng)) {
      trashItem(item, 'OUT_OF_MUNICIPALITY', type);
      report.trashed++;
      incrementReason(report.reasons, 'OUT_OF_MUNICIPALITY');
      continue;
    }
    
    if (isCacapavaSP(item.name, item.address)) {
      trashItem(item, 'CACAPAVA_SP', type);
      report.trashed++;
      incrementReason(report.reasons, 'CACAPAVA_SP');
      continue;
    }
    
    const normalizedCategory = normalizeCategory(item.category, type);
    if (normalizedCategory !== item.category) {
      item.category = normalizedCategory;
      report.normalized++;
    }
    
    report.kept++;
    incrementCategory(report.categories, item.category);
  }
  
  return report;
}

/**
 * Move item para quarentena (tabela TrashItem)
 */
async function trashItem(item: any, reason: TrashItem['reason'], table: TrashItem['originalTable']): Promise<void> {
  const trashEntry: TrashItem = {
    id: `trash_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    originalData: item,
    reason,
    trashedAt: new Date(),
    originalTable: table
  };
  
  // Em produção, salvaria no banco de dados
  console.log(`🗑️ Item removido: ${item.name} (${reason})`);
  
  // Simular salvamento na quarentena
  const currentTrash = getTrashFromStorage();
  currentTrash.push(trashEntry);
  saveTrashToStorage(currentTrash);
}

/**
 * Normaliza categorias para padrões válidos
 */
function normalizeCategory(category: string, type: 'pois' | 'restaurants' | 'events'): string {
  const categoryLower = category.toLowerCase();
  const validCategories = VALID_CATEGORIES[type];
  
  // Mapeamentos específicos para normalização
  const mappings: { [key: string]: { [key: string]: string } } = {
    pois: {
      'histórico': 'historia',
      'historico': 'historia',
      'history': 'historia',
      'natural': 'natureza',
      'nature': 'natureza',
      'paisagem': 'natureza',
      'gastronômico': 'gastronomia',
      'gastronomico': 'gastronomia',
      'food': 'gastronomia',
      'família': 'familia',
      'family': 'familia',
      'lazer': 'familia'
    },
    restaurants: {
      'regional': 'tradicional',
      'típico': 'tradicional',
      'tipico': 'tradicional',
      'local': 'tradicional',
      'moderno': 'contemporaneo',
      'gourmet': 'contemporaneo',
      'fast': 'rapida',
      'lanche': 'rapida',
      'café': 'cafeteria',
      'cafe': 'cafeteria'
    },
    events: {
      'cultura': 'cultural',
      'arte': 'cultural',
      'música': 'cultural',
      'musica': 'cultural',
      'esporte': 'esportivo',
      'competição': 'esportivo',
      'competicao': 'esportivo',
      'culinária': 'gastronomico',
      'culinaria': 'gastronomico',
      'comida': 'gastronomico',
      'educação': 'educativo',
      'educacao': 'educativo',
      'workshop': 'educativo'
    }
  };
  
  // Verificar mapeamentos
  if (mappings[type][categoryLower]) {
    return mappings[type][categoryLower];
  }
  
  // Verificar se já é uma categoria válida
  if (validCategories.includes(categoryLower)) {
    return categoryLower;
  }
  
  // Fallback para primeira categoria válida
  return validCategories[0];
}

/**
 * Funções auxiliares para relatórios
 */
function incrementReason(reasons: { [key: string]: number }, reason: string): void {
  reasons[reason] = (reasons[reason] || 0) + 1;
}

function incrementCategory(categories: { [key: string]: number }, category: string): void {
  categories[category] = (categories[category] || 0) + 1;
}

function mergeReports(target: DataQualityReport, source: DataQualityReport): void {
  target.totalProcessed += source.totalProcessed;
  target.kept += source.kept;
  target.trashed += source.trashed;
  target.normalized += source.normalized;
  
  Object.keys(source.reasons).forEach(reason => {
    target.reasons[reason] = (target.reasons[reason] || 0) + source.reasons[reason];
  });
  
  Object.keys(source.categories).forEach(category => {
    target.categories[category] = (target.categories[category] || 0) + source.categories[category];
  });
}

/**
 * Gerenciamento de quarentena no localStorage (simulação)
 */
function getTrashFromStorage(): TrashItem[] {
  const stored = localStorage.getItem('cacapava_trash_quarantine');
  return stored ? JSON.parse(stored) : [];
}

function saveTrashToStorage(trash: TrashItem[]): void {
  localStorage.setItem('cacapava_trash_quarantine', JSON.stringify(trash));
}

/**
 * Middleware para validação em runtime
 */
export function validateMunicipalityMiddleware(data: { lat: number; lng: number; name?: string; address?: string }): void {
  // Verificar coordenadas
  if (!insideBBox(data.lat, data.lng)) {
    throw new Error('INVALID_LOCATION: Coordenadas fora do município de Caçapava do Sul (RS)');
  }
  
  // Verificar se não é Caçapava (SP)
  if (data.name && data.address && isCacapavaSP(data.name, data.address)) {
    throw new Error('INVALID_LOCATION: Este item se refere a Caçapava (SP), não Caçapava do Sul (RS)');
  }
}

/**
 * Função para restaurar item da quarentena (se necessário)
 */
export function restoreFromTrash(trashId: string): boolean {
  const trash = getTrashFromStorage();
  const itemIndex = trash.findIndex(item => item.id === trashId);
  
  if (itemIndex === -1) {
    return false;
  }
  
  const restoredItem = trash[itemIndex];
  
  // Remover da quarentena
  trash.splice(itemIndex, 1);
  saveTrashToStorage(trash);
  
  console.log(`♻️ Item restaurado: ${restoredItem.originalData.name}`);
  
  // Em produção, reinseriria no banco de dados original
  
  return true;
}

/**
 * Relatório da quarentena
 */
export function getTrashReport(): {
  total: number;
  byReason: { [key: string]: number };
  byTable: { [key: string]: number };
  items: TrashItem[];
} {
  const trash = getTrashFromStorage();
  
  const byReason: { [key: string]: number } = {};
  const byTable: { [key: string]: number } = {};
  
  trash.forEach(item => {
    byReason[item.reason] = (byReason[item.reason] || 0) + 1;
    byTable[item.originalTable] = (byTable[item.originalTable] || 0) + 1;
  });
  
  return {
    total: trash.length,
    byReason,
    byTable,
    items: trash
  };
}
