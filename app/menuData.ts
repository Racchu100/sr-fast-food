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
      { name: 'Manchow Soup', half: 40, full: 60, type: 'both', image: '/manchow-soup.jpg' },
      { name: 'Clear Soup', full: 50, type: 'veg', image: '/clear-soup.jpg' },
      { name: 'Hot & Sour Soup', half: 50, full: 80, type: 'both', image: '/hot-sour-soup.jpg' },
      { name: 'Lung Fung Soup', half: 70, full: 100, type: 'both', image: '/lung-fung-soup.jpg' },
    ],
  },
  {
    id: 'rice',
    label: 'Fried Rice',
    emoji: '🍚',
    items: [
      { name: 'Fried Rice', half: 60, full: 100, type: 'veg', image: '/fried-rice.jpg' },
      { name: 'Schezwan Fried Rice', half: 70, full: 110, type: 'veg', image: '/schezwan-fried-rice.jpg' },
      { name: 'Munchooriyan Rice', half: 80, full: 120, type: 'veg', image: '/munchooriyan-rice.jpg' },
      { name: 'Triple Rice', half: 100, full: 150, type: 'veg', image: '/triple-rice.jpg' },
      { name: 'Singapore Rice', half: 70, full: 110, type: 'veg', image: '/singapore-rice.jpg' },
      { name: 'Combination Rice', half: 70, full: 110, type: 'veg', image: '/combination-rice.jpg' },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles',
    emoji: '🍜',
    items: [
      { name: 'Noodles', half: 60, full: 100, type: 'veg', image: '/noodles.jpg' },
      { name: 'Schewan Noodles', half: 70, full: 110, type: 'veg', image: '/schezwan-noodles.jpg' },
      { name: 'Munchooriyan Noodles', half: 80, full: 120, type: 'veg', image: '/munchooriyan-noodles.jpg' },
      { name: 'Triple Noodles', half: 100, full: 150, type: 'veg', image: '/triple-noodles.jpg' },
      { name: 'Singapore Noodles', half: 70, full: 110, type: 'veg', image: '/singapore-noodles.jpg' },
    ],
  },
  {
    id: 'starters',
    label: 'Starters',
    emoji: '🥗',
    items: [
      { name: 'Veg Manchuri', half: 70, full: 110, type: 'veg', image: '/veg-manchuri.jpg' },
      { name: 'Paneer', half: 80, full: 140, type: 'veg', image: '/paneer.jpg' },
      { name: 'Mushroom', half: 80, full: 140, type: 'veg', image: '/mushroom.jpg' },
    ],
  },
  {
    id: 'chicken',
    label: 'Chicken',
    emoji: '🍗',
    items: [
      { name: 'Chicken Kabab', single: 35, type: 'nonveg', image: '/chicken-kabab.jpg' },
      { name: 'Chicken Chilli Dry', half: 90, full: 150, type: 'nonveg', image: '/chicken-chilli-dry.jpg' },
      { name: 'Chicken Manchurian', half: 90, full: 150, type: 'nonveg', image: '/chicken-manchurian.jpg' },
      { name: 'Chicken Garlic', half: 90, full: 150, type: 'nonveg', image: '/chicken-garlic.jpg' },
      { name: 'Chicken Pepper', half: 90, full: 150, type: 'nonveg', image: '/chicken-pepper.jpg' },
      { name: 'Kabab Masala', half: 140, full: 240, type: 'nonveg', image: '/kabab-masala.jpg' },
      { name: 'Kabab Garlic', half: 140, full: 240, type: 'nonveg', image: '/kabab-garlic.jpg' },
    ],
  },
  {
    id: 'specials',
    label: 'Specials',
    emoji: '⭐',
    items: [
      { name: 'American Chops', single: 150, type: 'nonveg', image: '/american-chops.jpg' },
      { name: 'Chinese Bhel', single: 150, type: 'veg', image: '/chinese-bhel.jpg' },
      { name: 'Chinese Chops', single: 140, type: 'nonveg', image: '/chinese-chops.jpg' },
      { name: 'Chicken Cheese Omelette', single: 80, type: 'nonveg', image: '/chicken-cheese-omelette.jpg' },
      { name: 'Chicken Cheese Bhurji', single: 80, type: 'nonveg', image: '/chicken-cheese-bhurji.jpg' },
    ],
  },
];
