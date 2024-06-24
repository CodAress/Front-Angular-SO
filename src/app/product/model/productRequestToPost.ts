export interface ProductRequestToPost {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    specifications: Record<string, any>;
  }