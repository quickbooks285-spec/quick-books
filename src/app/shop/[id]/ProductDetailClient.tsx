'use client';

import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/components/shop/ProductCard';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check, Star, Shield, Zap, Download, Lock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart, isInCart } = useCart();
    const inCart = isInCart(product.id);

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const getCategoryGradient = (category: string) => {
        switch (category) {
            case 'Pro':
                return 'from-emerald-500 to-green-600';
            case 'Premier':
                return 'from-blue-500 to-indigo-600';
            case 'Enterprise':
                return 'from-purple-500 to-violet-600';
            default:
                return 'from-primary to-primary/80';
        }
    };

    const quickBenefits = [
        { icon: Zap, text: 'Instant Delivery' },
        { icon: Shield, text: 'Original & Genuine Key' },
        { icon: Download, text: 'Download from Official Website' },
        { icon: Lock, text: 'One-Time Purchase' },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <Section background="muted" className="pt-12 pb-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Product Image/Visual */}
                    <div className={cn(
                        "relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br",
                        getCategoryGradient(product.category)
                    )}>
                        {product.image && product.image.startsWith('/images/') ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="text-9xl font-bold text-white/20">
                                    {product.category === 'Pro' && 'P'}
                                    {product.category === 'Premier' && 'Pr'}
                                    {product.category === 'Enterprise' && 'E'}
                                    {product.category === 'Mac' && 'M'}
                                    {product.category === 'Accountant' && 'A'}
                                    {product.category === 'POS' && 'POS'}
                                </div>
                            </div>
                        )}
                        {product.badge && (
                            <Badge className="absolute top-6 left-6 bg-white text-primary font-semibold shadow-xl text-base px-4 py-2">
                                {product.badge}
                            </Badge>
                        )}
                        {discountPercentage > 0 && (
                            <Badge variant="destructive" className="absolute top-6 right-6 font-semibold shadow-xl text-base px-4 py-2">
                                -{discountPercentage}% OFF
                            </Badge>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                                {product.category}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        {/* Quick Benefits */}
                        <div className="grid grid-cols-2 gap-3">
                            {quickBenefits.map((benefit) => (
                                <div key={benefit.text} className="flex items-center gap-2 text-sm">
                                    <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="font-medium">{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "h-5 w-5",
                                            i < Math.floor(product.rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-muted text-muted"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium">
                                {product.rating} ({product.reviews.toLocaleString()} reviews)
                            </span>
                        </div>

                        {/* Price & CTA */}
                        <div className="bg-card border-2 border-border/50 rounded-2xl p-6 space-y-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-foreground">
                                    ${product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            <Button
                                size="lg"
                                className="w-full h-14 text-lg gap-2"
                                onClick={() => addToCart(product)}
                            >
                                {inCart ? (
                                    <>
                                        <Check className="h-5 w-5" />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </>
                                )}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                {product.inStock ? '✅ In Stock - Instant Delivery' : '❌ Out of Stock'}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>


            {/* Description Section - Consolidated */}
            <Section className="py-12">
                <h2 className="text-3xl font-bold mb-8">Description</h2>

                <div className="space-y-12">
                    {/* Overview */}
                    {product.overview && (
                        <div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {product.overview}
                            </p>
                        </div>
                    )}

                    {/* Long Description / What You'll Receive */}
                    {product.longDescription && (
                        <div className="bg-muted/50 border border-border/50 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">What You'll Receive</h3>
                            <pre className="whitespace-pre-wrap font-sans text-muted-foreground leading-relaxed">
                                {product.longDescription}
                            </pre>
                        </div>
                    )}

                    {/* Key Features */}
                    {product.keyFeatures && product.keyFeatures.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Key Features</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.keyFeatures.map((feature, index) => (
                                    <div key={index} className="bg-card border border-border/50 rounded-xl p-6 space-y-2">
                                        <h4 className="font-semibold text-base">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {product.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Features */}
                    {product.additionalFeatures && product.additionalFeatures.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Additional Features</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {product.additionalFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top Features */}
                    {product.topFeatures && product.topFeatures.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Top Features</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {product.topFeatures.map((feature, index) => (
                                    <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
                                        <h4 className="font-semibold text-base mb-2">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Data Migration */}
                    {product.dataMigration && product.dataMigration.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Data Migration & Compatibility</h3>
                            <p className="text-muted-foreground mb-4">
                                You can transfer your existing QuickBooks data to this version, including:
                            </p>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {product.dataMigration.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-card border border-border/50 rounded-lg p-3">
                                        <RefreshCw className="h-4 w-4 text-primary flex-shrink-0" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* System Requirements */}
                    {product.systemRequirements && product.systemRequirements.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                            <div className="bg-muted/50 border border-border/50 rounded-xl p-6 space-y-3">
                                {product.systemRequirements.map((req, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{req}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Section>


            {/* Final CTA Section */}
            <Section background="brand" className="py-16">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg opacity-90">
                        Join thousands of satisfied customers who trust this solution for their business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-xl"
                            onClick={() => addToCart(product)}
                        >
                            {inCart ? (
                                <>
                                    <Check className="h-5 w-5 mr-2" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart - ${product.price}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    );
}
