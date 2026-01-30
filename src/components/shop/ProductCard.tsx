'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Check, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { handleCheckout } from '@/lib/checkout';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart, isInCart } = useCart();

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const inCart = isInCart(product.id);

    const getCategoryGradient = (category: string) => {
        switch (category) {
            case 'Pro':
                return 'from-emerald-500/20 to-green-600/20';
            case 'Premier':
                return 'from-blue-500/20 to-indigo-600/20';
            case 'Enterprise':
                return 'from-purple-500/20 to-violet-600/20';
            default:
                return 'from-primary/20 to-primary/10';
        }
    };

    const getCategoryAccent = (category: string) => {
        switch (category) {
            case 'Pro':
                return 'text-emerald-600';
            case 'Premier':
                return 'text-blue-600';
            case 'Enterprise':
                return 'text-purple-600';
            default:
                return 'text-primary';
        }
    };

    return (
        <div
            className={cn(
                "group relative bg-card rounded-2xl overflow-hidden border border-border/50",
                "transition-all duration-500 ease-out",
                "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20",
                "hover:-translate-y-2",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/shop/${product.id}`} className={cn(
                    "block absolute inset-0 transition-transform duration-500 group-hover:scale-105",
                    product.image && product.image.startsWith('/images/')
                        ? "bg-white"
                        : `bg-gradient-to-br ${getCategoryGradient(product.category)}`
                )}>
                    {product.image && product.image.startsWith('/images/') ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-contain p-4"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={cn(
                                "text-6xl font-bold opacity-20",
                                getCategoryAccent(product.category)
                            )}>
                                {product.category === 'Pro' && 'P'}
                                {product.category === 'Premier' && 'Pr'}
                                {product.category === 'Enterprise' && 'E'}
                                {product.category === 'Mac' && 'M'}
                                {product.category === 'Accountant' && 'A'}
                                {product.category === 'POS' && 'POS'}
                            </div>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent",
                        "opacity-0 transition-opacity duration-300",
                        isHovered && "opacity-100"
                    )} />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                    {product.badge && (
                        <Badge className="bg-primary text-primary-foreground font-semibold shadow-lg">
                            {product.badge}
                        </Badge>
                    )}
                    {discountPercentage > 0 && (
                        <Badge variant="destructive" className="font-semibold shadow-lg">
                            -{discountPercentage}%
                        </Badge>
                    )}
                </div>

                {/* Quick Actions */}
                <div className={cn(
                    "absolute top-4 right-4 flex flex-col gap-2 z-10",
                    "transition-all duration-300",
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}>
                    <Button
                        size="icon"
                        variant="secondary"
                        className={cn(
                            "h-10 w-10 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white",
                            "transition-all duration-200 hover:scale-110",
                            isLiked && "bg-red-50 hover:bg-red-100"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                    >
                        <Heart className={cn(
                            "h-5 w-5 transition-colors",
                            isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        )} />
                    </Button>
                </div>

                {/* Add to Cart Button */}
                <div className={cn(
                    "absolute bottom-4 left-4 right-4 z-10",
                    "transition-all duration-300",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className={cn(
                                "flex-none w-12 rounded-xl shadow-xl font-semibold",
                                inCart
                                    ? "bg-green-100 hover:bg-green-200 text-green-700"
                                    : "bg-white/90 hover:bg-white text-primary"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                        >
                            {inCart ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <ShoppingCart className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            className={cn(
                                "flex-1 rounded-xl shadow-xl font-semibold gap-2",
                                "bg-primary hover:bg-primary/90 text-primary-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                handleCheckout(product);
                            }}
                        >
                            <CreditCard className="h-4 w-4" />
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                {/* Category */}
                <p className={cn(
                    "text-xs font-medium uppercase tracking-wider",
                    getCategoryAccent(product.category)
                )}>
                    {product.category}
                </p>

                {/* Name */}
                <Link href={`/shop/${product.id}`} className="block">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>

                {/* Features Preview */}
                {product.features && (
                    <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3 w-3 text-primary flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                        {product.features.length > 3 && (
                            <li className="text-xs text-primary font-medium">
                                +{product.features.length - 3} more features
                            </li>
                        )}
                    </ul>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "h-4 w-4",
                                    i < Math.floor(product.rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-muted text-muted"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-bold text-foreground">
                        ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
