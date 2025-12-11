export enum Category {
  Men = 'Men',
  Women = 'Women',
  Unisex = 'Unisex',
  Accessories = 'Accessories',
  Clothing = 'Clothing'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  sizes: (number | string)[];
  colors: string[];
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  selectedSize: number | string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: Category | 'All';
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}