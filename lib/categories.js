export const CATEGORIES = [
  'Business Tips',
  'Operations',
  'Invoicing',
  'Team Management',
  'Growth',
  'Tools',
];

export const CATEGORY_COLORS = {
  'Business Tips':    { bg: 'rgba(61,92,255,0.15)',   text: 'var(--color-primary)' },
  'Operations':       { bg: 'rgba(0,180,120,0.15)',    text: '#00c87a' },
  'Invoicing':        { bg: 'rgba(255,160,0,0.15)',    text: '#ffb020' },
  'Team Management':  { bg: 'rgba(160,100,255,0.15)', text: '#a064ff' },
  'Growth':           { bg: 'rgba(0,210,220,0.15)',    text: '#00d2dc' },
  'Tools':            { bg: 'rgba(255,80,150,0.15)',   text: '#ff5096' },
};

export function categoryStyle(category) {
  return CATEGORY_COLORS[category] ?? { bg: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.7)' };
}
