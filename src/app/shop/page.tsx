'use client';

import { useState, useMemo } from 'react';
import { Section } from '@/components/layout/Section';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { products as allProducts, categories, categoryDescriptions } from '@/data/products';
import { cn } from '@/lib/utils';
import { ShoppingBag, Sparkles, Truck, Shield, HeadphonesIcon, Zap } from 'lucide-react';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('featured');
    const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');

    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort products
        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.reverse();
                break;
            default:
                break;
        }

        return filtered;
    }, [selectedCategory, sortOption]);

    const benefits = [
        {
            icon: Zap,
            title: 'Instant Activation',
            description: 'Start using your software immediately',
        },
        {
            icon: Shield,
            title: '30-Day Guarantee',
            description: 'Full refund if not satisfied',
        },
        {
            icon: HeadphonesIcon,
            title: '24/7 Support',
            description: 'Expert help whenever you need it',
        },
        {
            icon: Sparkles,
            title: 'Free Updates',
            description: 'Always up to date with latest features',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <Section background="muted" className="pb-8 pt-16">
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        <ShoppingBag className="h-4 w-4" />
                        Official QuickBooks Store
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Choose Your{' '}
                        <span className="text-primary relative">
                            QuickBooks
                            <svg
                                className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                                viewBox="0 0 200 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 10C50 4 150 4 198 10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>{' '}
                        Edition
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        From startups to enterprises, find the perfect accounting solution for your business needs.
                    </p>
                </div>
            </Section>

            {/* Category Cards */}
            <div className="border-b border-border/50 bg-background">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category) => {
                            const info = categoryDescriptions[category];
                            const isSelected = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(isSelected ? 'all' : category)}
                                    className={cn(
                                        "relative p-6 rounded-2xl border-2 text-left transition-all duration-300",
                                        "hover:shadow-lg hover:-translate-y-1",
                                        isSelected
                                            ? "border-primary bg-primary/5 shadow-lg"
                                            : "border-border/50 hover:border-primary/50"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20",
                                        `bg-gradient-to-br ${info.color}`
                                    )} />
                                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                                    <p className="text-sm text-muted-foreground">{info.description}</p>
                                    {isSelected && (
                                        <div className="absolute top-4 right-4">
                                            <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Benefits Bar */}
            <div className="border-b border-border/50 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="flex items-center gap-3 p-3 rounded-xl"
                            >
                                <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <benefit.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{benefit.title}</p>
                                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <Section className="py-12">
                <ShopFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    productCount={filteredProducts.length}
                />

                {/* Product Grid */}
                <div
                    className={cn(
                        "grid gap-6 mt-8",
                        viewMode === 'grid'
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2"
                    )}
                >
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16 space-y-4">
                        <div className="h-24 w-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold">No products found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters or browse all products
                        </p>
                    </div>
                )}
            </Section>

            {/* CTA Section */}
            <Section background="brand" className="py-16">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Need Help Choosing?
                    </h2>
                    <p className="text-lg opacity-90">
                        Our team of experts is ready to help you find the perfect solution for your business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                            Talk to an Expert
                        </button>
                        <button className="px-8 py-3 border-2 border-white/30 font-semibold rounded-full hover:bg-white/10 transition-all">
                            Compare All Plans
                        </button>
                    </div>
                </div>
            </Section>
        </div>
    );
}
