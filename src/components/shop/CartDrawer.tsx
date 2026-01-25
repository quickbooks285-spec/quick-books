'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CartDrawer() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        Shopping Cart
                        <span className="ml-2 bg-primary text-primary-foreground text-sm font-medium px-2.5 py-0.5 rounded-full">
                            {totalItems}
                        </span>
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
                        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Your cart is empty</h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                Add some products to get started
                            </p>
                        </div>
                        <Button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-4 bg-primary hover:bg-primary/90"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border/50"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-primary/40">
                                                {item.category.charAt(0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm leading-tight truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {item.category}
                                        </p>
                                        <p className="font-bold text-primary mt-1">
                                            ${item.price.toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1 bg-background rounded-lg border p-0.5">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <SheetFooter className="border-t pt-4 flex-col gap-4">
                            <div className="w-full space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (8.75%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="w-full" onClick={() => setIsCartOpen(false)}>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base gap-2 rounded-xl">
                                    Proceed to Checkout
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsCartOpen(false)}
                            >
                                Continue Shopping
                            </Button>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
