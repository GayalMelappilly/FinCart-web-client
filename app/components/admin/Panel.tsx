'use client'

import React, { useState, useEffect, useMemo } from 'react';
import {
    Package,
    Grid3x3,
    Check,
    X,
    Plus,
    Search,
    Home,
    Star,
    DollarSign,
    Menu,
    Bell,
    Settings,
    TrendingUp,
    Activity,
    ShoppingCart,
    BarChart3,
    ChevronRight,
    MoreHorizontal,
    Clock
} from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllCategoriesWithCount } from '@/app/services/adminServices';
import { FishCategory } from '@/app/types/admin/types';
import CategorySearch from './CategorySearch';
import CategoryGrid from './CategoryGrid';

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

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<FishCategory[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categorySearchQuery, setCategorySearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    // const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-categories-with-count-admin'],
        queryFn: getAllCategoriesWithCount
    });

    useEffect(() => {
        if (data?.list) {
            setCategories(data.list);
        }
    }, [data]);

    const updateProductStatus = (productId: string, status: 'approved' | 'rejected') => {
        setProducts(prev =>
            prev.map(product =>
                product.id === productId ? { ...product, status } : product
            )
        );
    };

    // const filteredProducts = products.filter(product => {
    //     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    //     const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    //     return matchesSearch && matchesFilter;
    // });

    const filteredCategories = useMemo(() => {
        return categories.filter((cat) =>
            cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

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

    // Calculate total active categories
    const totalActiveCategories = categories.length;
    const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
    const featuredCategories = categories.filter(cat => cat.feature).length;

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h1 className="text-lg font-semibold text-red-800 mb-2">Error</h1>
                    <p className="text-red-600">Error while fetching categories: {error.message}</p>
                </div>
            </div>
        </div>
    );

    const DashboardView = () => (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalProducts}</p>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Across all categories
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
                            <p className="text-sm font-medium text-gray-600">Total Categories</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalActiveCategories}</p>
                            <p className="text-xs text-emerald-600 mt-1 flex items-center">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                {featuredCategories} featured
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
                        {products.length === 0 && (
                            <div className="text-center py-8">
                                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No products yet</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories Overview</h3>
                    <div className="space-y-4">
                        {categories.slice(0, 6).map(category => (
                            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Grid3x3 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{category.name}</p>
                                        <p className="text-sm text-gray-500">{category.productCount} products</p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    {category.feature && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs text-center">Featured</span>
                                    )}
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs text-center">
                                        Active
                                    </span>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center py-8">
                                <Grid3x3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No categories yet</p>
                            </div>
                        )}
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
                            onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "approved" | "rejected")}
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

            {/* Empty State */}
            {products.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Yet</h3>
                    <p className="text-gray-500 mb-6">Products will appear here once vendors start listing them.</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Invite Vendors
                    </button>
                </div>
            )}
        </div>
    );

    const CategoriesView = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                        <p className="text-gray-600 mt-1">Organize products into categories and subcategories</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <CategorySearch
                            categorySearchQuery={categorySearchQuery}
                            setCategorySearchQuery={setCategorySearchQuery}
                        />
                        <button
                            // onClick={() => setShowCategoryModal(true)}
                            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="whitespace-nowrap">Add Category</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Categories</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalActiveCategories}</p>
                        </div>
                        <Grid3x3 className="h-8 w-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Featured Categories</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{featuredCategories}</p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalProducts}</p>
                        </div>
                        <Package className="h-8 w-8 text-green-600" />
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <CategoryGrid 
            filteredCategories={filteredCategories} 
            categorySearchQuery={categorySearchQuery} 
            // setShowCategoryModal={setShowCategoryModal} 
            />
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
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
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
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
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
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Grid3x3 className="h-5 w-5" />
                                <span className="font-medium">Categories</span>
                            </button>
                        </nav>

                        {/* User Profile */}
                        {/* <div className="p-4 border-t border-gray-200">
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
                        </div> */}
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

export default AdminPanel;