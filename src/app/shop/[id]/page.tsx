import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
