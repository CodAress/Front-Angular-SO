export interface ProductRequest {
    name: string;
    description: string;
    category_id: string;
    brand_id: string;
    price: number;
    stock: number;
    images: string[];
    specifications: Record<string, any>;
}