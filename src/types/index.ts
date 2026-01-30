export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    badge?: string;
    inStock: boolean;
    features?: string[];
    longDescription?: string;
    systemRequirements?: string[];
    overview?: string;
    keyFeatures?: { title: string; description: string }[];
    additionalFeatures?: string[];
    benefits?: string[];
    dataMigration?: string[];
    topFeatures?: { title: string; description: string }[];
}
