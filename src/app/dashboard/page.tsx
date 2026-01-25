'use client';

import { useState } from 'react';
import { useOrders, Order } from '@/context/OrdersContext';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DollarSign,
    ShoppingCart,
    Clock,
    TrendingUp,
    Search,
    Download,
    RefreshCw,
    Eye,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    LogOut,
    User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function DashboardContent() {
    const {
        orders,
        totalRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        updateOrderStatus,
    } = useOrders();

    const { user, logout } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Filter orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.lastName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate stats
    const averageOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;

    const stats = [
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+12.5%',
            changeType: 'positive' as const,
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            title: 'Total Orders',
            value: totalOrders.toString(),
            change: '+8.2%',
            changeType: 'positive' as const,
            icon: ShoppingCart,
            color: 'bg-blue-500',
        },
        {
            title: 'Pending Orders',
            value: pendingOrders.toString(),
            change: pendingOrders > 5 ? '+3' : '-2',
            changeType: pendingOrders > 5 ? 'negative' : 'positive' as const,
            icon: Clock,
            color: 'bg-amber-500',
        },
        {
            title: 'Avg. Order Value',
            value: `$${averageOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+5.1%',
            changeType: 'positive' as const,
            icon: TrendingUp,
            color: 'bg-purple-500',
        },
    ];

    const getStatusBadge = (status: Order['status']) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            processing: 'bg-blue-100 text-blue-700 border-blue-200',
            completed: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
            refunded: 'bg-gray-100 text-gray-700 border-gray-200',
        };

        return (
            <Badge variant="outline" className={cn('capitalize font-medium', styles[status])}>
                {status}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="pt-20 bg-muted/20 min-h-screen">
            <Section className="py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Monitor your sales and manage transactions
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* User Info */}
                        <div className="flex items-center gap-3 px-4 py-2 bg-card border rounded-xl">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium">{user?.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={logout}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div className={cn('p-3 rounded-xl', stat.color)}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div
                                    className={cn(
                                        'flex items-center gap-1 text-sm font-medium',
                                        stat.changeType === 'positive'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    )}
                                >
                                    {stat.changeType === 'positive' ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="bg-card rounded-2xl border overflow-hidden">
                    {/* Table Header */}
                    <div className="p-6 border-b">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2 className="text-xl font-semibold">Recent Transactions</h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                {/* Search */}
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                {/* Status Filter */}
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-40">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    {filteredOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead className="font-semibold">Order</TableHead>
                                        <TableHead className="font-semibold">Customer</TableHead>
                                        <TableHead className="font-semibold">Products</TableHead>
                                        <TableHead className="font-semibold">Total</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold">Date</TableHead>
                                        <TableHead className="font-semibold text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-muted/30">
                                            <TableCell>
                                                <span className="font-mono font-medium text-primary">
                                                    {order.orderNumber}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">
                                                        {order.customer.firstName} {order.customer.lastName}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {order.customer.email}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 text-primary" />
                                                        <span className="font-medium text-sm">
                                                            {order.items[0]?.name}
                                                        </span>
                                                    </div>
                                                    {order.items.length > 1 && (
                                                        <span className="text-xs text-muted-foreground pl-6">
                                                            + {order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-semibold">
                                                    ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                            <TableCell>
                                                <span className="text-sm text-muted-foreground">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(value) =>
                                                            updateOrderStatus(order.id, value as Order['status'])
                                                        }
                                                    >
                                                        <SelectTrigger className="w-32 h-8 text-xs">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="processing">Processing</SelectItem>
                                                            <SelectItem value="completed">Completed</SelectItem>
                                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                                            <SelectItem value="refunded">Refunded</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => setSelectedOrder(order)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-lg">No transactions yet</h3>
                            <p className="text-muted-foreground mt-1">
                                Orders will appear here once customers make purchases.
                            </p>
                            <Link href="/shop">
                                <Button className="mt-4 bg-primary hover:bg-primary/90">
                                    View Shop
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6 border-b sticky top-0 bg-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold">Order Details</h3>
                                        <p className="text-muted-foreground font-mono">
                                            {selectedOrder.orderNumber}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedOrder(null)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>

                                {/* Customer Info */}
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Customer Information</h4>
                                    <div className="bg-muted/30 rounded-xl p-4 space-y-2 text-sm">
                                        <p>
                                            <span className="text-muted-foreground">Name:</span>{' '}
                                            {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                                        </p>
                                        <p>
                                            <span className="text-muted-foreground">Email:</span>{' '}
                                            {selectedOrder.customer.email}
                                        </p>
                                        {selectedOrder.customer.company && (
                                            <p>
                                                <span className="text-muted-foreground">Company:</span>{' '}
                                                {selectedOrder.customer.company}
                                            </p>
                                        )}
                                        <p>
                                            <span className="text-muted-foreground">Address:</span>{' '}
                                            {selectedOrder.customer.address}, {selectedOrder.customer.city},{' '}
                                            {selectedOrder.customer.state} {selectedOrder.customer.zip}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Order Items</h4>
                                    <div className="space-y-2">
                                        {selectedOrder.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity} × ${item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${selectedOrder.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>${selectedOrder.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            ${selectedOrder.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="text-sm text-muted-foreground pt-4 border-t">
                                    <p>Created: {formatDate(selectedOrder.createdAt)}</p>
                                    <p>Last Updated: {formatDate(selectedOrder.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
