export const chartColors = {
  blue: '#3b82f6',
  pink: '#ec4899',
  gray: '#6b7280',
  teal: '#14b8a6',
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#8b5cf6',
  indigo: '#6366f1',
  cyan: '#06b6d4',
  lime: '#a3e635'
};

export const chartColorsArray = [
    '#3b82f6', '#ec4899', '#6b7280', '#14b8a6', 
    '#22c55e', '#eab308', '#f97316', '#ef4444', 
    '#8b5cf6', '#6366f1', '#06b6d4', '#a3e635'
];

export const transparentChartColors = chartColorsArray.map(color => `${color}B3`);
