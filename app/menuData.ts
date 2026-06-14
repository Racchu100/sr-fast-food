export type MenuItem = {
  name: string;
  half?: number;
  full?: number;
  single?: number;
  type: 'veg' | 'nonveg' | 'both';
  image?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'soups',
    label: 'Soups',
    emoji: '🍲',
    items: [
      { name: 'Manchow Soup', half: 40, full: 60, type: 'both', image: '/manchow-soup.webp' },
      { name: 'Clear Soup', full: 50, type: 'veg', image: '/clear-soup.webp' },
      { name: 'Hot & Sour Soup', half: 50, full: 80, type: 'both', image: '/hot-sour-soup.webp' },
      { name: 'Lung Fung Soup', half: 70, full: 100, type: 'both', image: '/lung-fung-soup.webp' },
    ],
  },
  {
    id: 'rice',
    label: 'Fried Rice',
    emoji: '🍚',
    items: [
      { name: 'Fried Rice', half: 60, full: 100, type: 'veg', image: '/fried-rice.webp' },
      { name: 'Schezwan Fried Rice', half: 70, full: 110, type: 'veg', image: '/schezwan-fried-rice.webp' },
      { name: 'Munchooriyan Rice', half: 80, full: 120, type: 'veg', image: '/munchooriyan-rice.webp' },
      { name: 'Triple Rice', half: 100, full: 150, type: 'veg', image: '/triple-rice.webp' },
      { name: 'Singapore Rice', half: 70, full: 110, type: 'veg', image: '/singapore-rice.webp' },
      { name: 'Combination Rice', half: 70, full: 110, type: 'veg', image: '/combination-rice.webp' },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles',
    emoji: '🍜',
    items: [
      { name: 'Noodles', half: 60, full: 100, type: 'veg', image: '/noodles.webp' },
      { name: 'Schewan Noodles', half: 70, full: 110, type: 'veg', image: '/schezwan-noodles.webp' },
      { name: 'Munchooriyan Noodles', half: 80, full: 120, type: 'veg', image: '/munchooriyan-noodles.webp' },
      { name: 'Triple Noodles', half: 100, full: 150, type: 'veg', image: '/triple-noodles.webp' },
      { name: 'Singapore Noodles', half: 70, full: 110, type: 'veg', image: '/singapore-noodles.webp' },
    ],
  },
  {
    id: 'starters',
    label: 'Starters',
    emoji: '🥗',
    items: [
      { name: 'Veg Manchuri', half: 70, full: 110, type: 'veg', image: '/veg-manchuri.webp' },
      { name: 'Paneer', half: 80, full: 140, type: 'veg', image: '/paneer.webp' },
      { name: 'Mushroom', half: 80, full: 140, type: 'veg', image: '/mushroom.webp' },
    ],
  },
  {
    id: 'chicken',
    label: 'Chicken',
    emoji: '🍗',
    items: [
      { name: 'Chicken Kabab', single: 35, type: 'nonveg', image: '/chicken-kabab.webp' },
      { name: 'Chicken Chilli Dry', half: 90, full: 150, type: 'nonveg', image: '/chicken-chilli-dry.webp' },
      { name: 'Chicken Manchurian', half: 90, full: 150, type: 'nonveg', image: '/chicken-manchurian.webp' },
      { name: 'Chicken Garlic', half: 90, full: 150, type: 'nonveg', image: '/chicken-garlic.webp' },
      { name: 'Chicken Pepper', half: 90, full: 150, type: 'nonveg', image: '/chicken-pepper.webp' },
      { name: 'Kabab Masala', half: 140, full: 240, type: 'nonveg', image: '/kabab-masala.webp' },
      { name: 'Kabab Garlic', half: 140, full: 240, type: 'nonveg', image: '/kabab-garlic.webp' },
    ],
  },
  {
    id: 'specials',
    label: 'Specials',
    emoji: '⭐',
    items: [
      { name: 'American Chops', single: 150, type: 'nonveg', image: '/american-chops.webp' },
      { name: 'Chinese Bhel', single: 150, type: 'veg', image: '/chinese-bhel.webp' },
      { name: 'Chinese Chops', single: 140, type: 'nonveg', image: '/chinese-chops.webp' },
      { name: 'Chicken Cheese Omelette', single: 80, type: 'nonveg', image: '/chicken-cheese-omelette.webp' },
      { name: 'Chicken Cheese Bhurji', single: 80, type: 'nonveg', image: '/chicken-cheese-bhurji.webp' },
    ],
  },
];
