'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react';

interface ShopFiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortOption: string;
    onSortChange: (sort: string) => void;
    viewMode: 'grid' | 'large';
    onViewModeChange: (mode: 'grid' | 'large') => void;
    productCount: number;
}

export function ShopFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    sortOption,
    onSortChange,
    viewMode,
    onViewModeChange,
    productCount,
}: ShopFiltersProps) {
    return (
        <div className="space-y-6">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                        "rounded-full transition-all duration-200",
                        selectedCategory === 'all' && "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    )}
                    onClick={() => onCategoryChange('all')}
                >
                    All Products
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        className={cn(
                            "rounded-full transition-all duration-200",
                            selectedCategory === category && "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        )}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{productCount}</span> products
                </p>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Sort Select */}
                    <Select value={sortOption} onValueChange={onSortChange}>
                        <SelectTrigger className="w-full sm:w-[180px] rounded-lg">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Best Rating</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex items-center border rounded-lg p-1 bg-muted/30">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 rounded-md",
                                viewMode === 'grid' && "bg-background shadow-sm"
                            )}
                            onClick={() => onViewModeChange('grid')}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 rounded-md",
                                viewMode === 'large' && "bg-background shadow-sm"
                            )}
                            onClick={() => onViewModeChange('large')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
