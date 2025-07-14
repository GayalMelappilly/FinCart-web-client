'use client'

import React, { useState, useEffect } from 'react';
import {
    Package,
    Grid3x3,
    Check,
    X,
    Eye,
    Edit,
    Trash2,
    Plus,
    Search,
    Filter,
    ChevronDown,
    Home,
    Star,
    Calendar,
    DollarSign,
    Users,
    Menu,
    Bell,
    Settings,
    LogOut,
    TrendingUp,
    Activity,
    ShoppingCart,
    BarChart3,
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';

// Types
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    status: 'pending' | 'approved' | 'rejected';
    image: string;
    createdAt: string;
    vendor: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    showOnHome: boolean;
    productsCount: number;
    icon: string;
}

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sample data initialization
    useEffect(() => {
        setProducts([
            {
                id: '1',
                name: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation',
                price: 299.99,
                category: 'Electronics',
                status: 'pending',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-15',
                vendor: 'TechCorp'
            },
            {
                id: '2',
                name: 'Smart Watch',
                description: 'Advanced fitness tracking smartwatch',
                price: 199.99,
                category: 'Electronics',
                status: 'approved',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-14',
                vendor: 'WearTech'
            },
            {
                id: '3',
                name: 'Running Shoes',
                description: 'Comfortable running shoes for all terrains',
                price: 129.99,
                category: 'Sports',
                status: 'pending',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-13',
                vendor: 'SportsBrand'
            },
            {
                id: '4',
                name: 'Coffee Maker',
                description: 'Automatic coffee maker with programmable settings',
                price: 89.99,
                category: 'Home',
                status: 'rejected',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-12',
                vendor: 'HomeAppliances'
            },
            {
                id: '5',
                name: 'Bluetooth Speaker',
                description: 'Portable waterproof Bluetooth speaker',
                price: 79.99,
                category: 'Electronics',
                status: 'approved',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-11',
                vendor: 'AudioTech'
            },
            {
                id: '6',
                name: 'Yoga Mat',
                description: 'Eco-friendly non-slip yoga mat',
                price: 45.99,
                category: 'Sports',
                status: 'pending',
                image: '/api/placeholder/100/100',
                createdAt: '2024-01-10',
                vendor: 'FitnessPro'
            }
        ]);

        setCategories([
            {
                id: '1',
                name: 'Electronics',
                description: 'Electronic devices and gadgets',
                isActive: true,
                showOnHome: true,
                productsCount: 25,
                icon: '📱'
            },
            {
                id: '2',
                name: 'Sports',
                description: 'Sports equipment and accessories',
                isActive: true,
                showOnHome: true,
                productsCount: 18,
                icon: '⚽'
            },
            {
                id: '3',
                name: 'Home',
                description: 'Home and kitchen appliances',
                isActive: true,
                showOnHome: false,
                productsCount: 12,
                icon: '🏠'
            },
            {
                id: '4',
                name: 'Fashion',
                description: 'Clothing and accessories',
                isActive: false,
                showOnHome: false,
                productsCount: 8,
                icon: '👕'
            }
        ]);
    }, []);

    const updateProductStatus = (productId: string, status: 'approved' | 'rejected') => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId ? { ...product, status } : product
            )
        );
    };

    const toggleCategoryHome = (categoryId: string) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? { ...category, showOnHome: !category.showOnHome }
                    : category
            )
        );
    };

    const toggleCategoryActive = (categoryId: string) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? { ...category, isActive: !category.isActive }
                    : category
            )
        );
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const bulkApprove = () => {
        selectedProducts.forEach(productId => {
            updateProductStatus(productId, 'approved');
        });
        setSelectedProducts([]);
    };

    const bulkReject = () => {
        selectedProducts.forEach(productId => {
            updateProductStatus(productId, 'rejected');
        });
        setSelectedProducts([]);
    };

    const DashboardView = () => (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +12% from last month
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{products.filter(p => p.status === 'pending').length}</p>
                            <p className="text-xs text-amber-600 mt-1 flex items-center">
                                <Activity className="h-3 w-3 mr-1" />
                                Requires attention
                            </p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <Clock className="h-6 w-6 text-amber-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Categories</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{categories.filter(c => c.isActive).length}</p>
                            <p className="text-xs text-emerald-600 mt-1 flex items-center">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                All operational
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <Grid3x3 className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">$12,345</p>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                +8% from last week
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                            <ShoppingCart className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            View all <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {products.slice(0, 5).map(product => (
                            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Package className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.vendor} • ${product.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                        {product.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories Overview</h3>
                    <div className="space-y-4">
                        {categories.map(category => (
                            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{category.icon}</span>
                                    <div>
                                        <p className="font-medium text-gray-900">{category.name}</p>
                                        <p className="text-sm text-gray-500">{category.productsCount} products</p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    {category.showOnHome && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs text-center">Home</span>
                                    )}
                                    <span className={`px-2 py-1 rounded-full text-xs text-center ${category.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductsView = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                        <p className="text-gray-600 mt-1">Manage and approve products from vendors</p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors w-full sm:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {selectedProducts.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <p className="text-sm font-medium text-blue-900">
                                {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={bulkApprove}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 text-sm font-medium"
                                >
                                    <Check className="h-4 w-4" />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={bulkReject}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm font-medium"
                                >
                                    <X className="h-4 w-4" />
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-4">
                            <input
                                type="checkbox"
                                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={selectedProducts.includes(product.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedProducts([...selectedProducts, product.id]);
                                    } else {
                                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                    }
                                }}
                            />
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                <Package className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <span className="text-sm font-medium text-gray-900">${product.price}</span>
                                            <span className="text-sm text-gray-500">{product.category}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                        {product.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm text-gray-500">by {product.vendor}</span>
                                    <div className="flex space-x-2">
                                        {product.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateProductStatus(product.id, 'approved')}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => updateProductStatus(product.id, 'rejected')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedProducts(filteredProducts.map(p => p.id));
                                            } else {
                                                setSelectedProducts([]);
                                            }
                                        }}
                                    />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedProducts([...selectedProducts, product.id]);
                                                } else {
                                                    setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mr-4 flex items-center justify-center">
                                                <Package className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.vendor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {product.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateProductStatus(product.id, 'approved')}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateProductStatus(product.id, 'rejected')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const CategoriesView = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                        <p className="text-gray-600 mt-1">Organize products into categories</p>
                    </div>
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                    <span className="text-xl">{category.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.productsCount} products</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setEditingCategory(category)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">{category.description}</p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Show on Home</span>
                                <button
                                    onClick={() => toggleCategoryHome(category.id)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${category.showOnHome ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${category.showOnHome ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">Active</span>
                                <button
                                    onClick={() => toggleCategoryActive(category.id)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${category.isActive ? 'bg-emerald-600' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${category.isActive ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Settings className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                                    <Image
                                        src="/erasebg-transformed.png"
                                        alt="Fincart Logo"
                                        className="h-8 object-contain"
                                        width={170}
                                        height={170}
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                                    <p className="text-xs text-gray-500">Marketplace Manager</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            <button
                                onClick={() => {
                                    setActiveTab('dashboard');
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'dashboard'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Home className="h-5 w-5" />
                                <span className="font-medium">Dashboard</span>
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('products');
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'products'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Package className="h-5 w-5" />
                                <span className="font-medium">Products</span>
                                {products.filter(p => p.status === 'pending').length > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                        {products.filter(p => p.status === 'pending').length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab('categories');
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'categories'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Grid3x3 className="h-5 w-5" />
                                <span className="font-medium">Categories</span>
                            </button>
                        </nav>

                        {/* User Profile */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 lg:ml-0">
                    {/* Desktop Header */}
                    <div className="hidden lg:block bg-white border-b border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {activeTab === 'dashboard' && 'Dashboard'}
                                    {activeTab === 'products' && 'Products'}
                                    {activeTab === 'categories' && 'Categories'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {activeTab === 'dashboard' && 'Monitor your marketplace performance'}
                                    {activeTab === 'products' && 'Manage product listings and approvals'}
                                    {activeTab === 'categories' && 'Organize your product categories'}
                                </p>
                            </div>
                            {/* <div className="flex items-center space-x-4">
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                                    <Bell className="h-5 w-5 text-gray-600" />
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Settings className="h-5 w-5 text-gray-600" />
                                </button>
                                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <Users className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                                        <p className="text-xs text-gray-500">Administrator</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="p-4 lg:p-8">
                        {activeTab === 'dashboard' && <DashboardView />}
                        {activeTab === 'products' && <ProductsView />}
                        {activeTab === 'categories' && <CategoriesView />}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Clock component for pending products
const Clock: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
);

export default AdminPanel;