import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Michael Kors Hamilton Satchel',
    price: 258.00,
    category: Category.Women,
    description: 'Classic MK monogram satchel in brown with rich leather accents and gold-tone hardware. Features the signature MK lock pendant. (No Box included).',
    sizes: ['One Size'],
    colors: ['Brown/Tan'],
    image: 'https://placehold.co/600x600/5C4033/FFFFFF?text=MK+Hamilton+Satchel',
    rating: 4.7
  },
  {
    id: '2',
    name: 'Christian Dior Book Tote',
    price: 2850.00,
    category: Category.Women,
    description: 'The iconic Dior Book Tote in black quilted texture. A perfect blend of sophistication and practicality, spacious enough for all your daily essentials.',
    sizes: ['One Size'],
    colors: ['Black'],
    image: 'https://placehold.co/600x600/1a1a1a/FFFFFF?text=Dior+Book+Tote',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Coach Tabby Shoulder Bag',
    price: 395.00,
    category: Category.Women,
    description: 'A modern take on an archival 1970s Coach design. Crafted in beige leather with the signature gold C hardware. 12A Quality, size 4/9 inch.',
    sizes: ['One Size'],
    colors: ['Beige'],
    image: 'https://placehold.co/600x600/E8DCC4/333333?text=Coach+Tabby+Beige',
    rating: 4.8
  },
  {
    id: '4',
    name: 'Dolce & Gabbana Logo Tote',
    price: 1150.00,
    category: Category.Women,
    description: 'Structured black leather tote featuring an embossed DG logo. A statement piece that pairs perfectly with urban chic attire.',
    sizes: ['One Size'],
    colors: ['Black'],
    image: 'https://placehold.co/600x600/000000/FFFFFF?text=DG+Logo+Tote',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Ray-Ban Aviator 3026',
    price: 163.00,
    category: Category.Unisex,
    description: 'Timeless Ray-Ban Aviator sunglasses with gold frames and classic G-15 green lenses. The ultimate symbol of cool.',
    sizes: ['Standard'],
    colors: ['Gold/Green'],
    image: 'https://placehold.co/600x600/d4af37/FFFFFF?text=Ray-Ban+Aviator',
    rating: 4.9
  },
  {
    id: '6',
    name: 'Coach Pink Shoulder Bag',
    price: 350.00,
    category: Category.Women,
    description: 'Playful and chic Coach shoulder bag in pink monogram canvas with gold chain detailing. 12A Quality, perfect for a night out.',
    sizes: ['One Size'],
    colors: ['Pink'],
    image: 'https://placehold.co/600x600/FFC0CB/333333?text=Coach+Pink+Bag',
    rating: 4.8
  },
  {
    id: '7',
    name: 'Louis Vuitton LV Trainer',
    price: 1290.00,
    category: Category.Men,
    description: 'Iconic LV Trainer sneaker featuring blue Monogram denim. Detailed rubber outsole and LV signature on the side.',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Blue Denim', 'White'],
    image: 'https://placehold.co/600x600/3b82f6/FFFFFF?text=LV+Trainer+Denim',
    rating: 5.0
  },
  {
    id: '8',
    name: 'Prada Denim Jeans',
    price: 790.00,
    category: Category.Men,
    description: 'Premium light wash denim jeans featuring the iconic Prada triangle logo on the back pocket. Made in Italy.',
    sizes: ['30W', '32W', '34W', '36W'],
    colors: ['Light Blue'],
    image: 'https://placehold.co/600x600/89CFF0/333333?text=Prada+Jeans',
    rating: 4.7
  }
];