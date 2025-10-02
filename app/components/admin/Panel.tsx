'use client'

import React, { useState, useEffect } from 'react';
import {
    Package,
    Grid3x3,
    // Check,
    // X,
    Plus,
    // Search,
    Home,
    Star,
    Menu,
    Bell,
    Settings,
    TrendingUp,
    // Activity,
    BarChart3,
    // Clock
} from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllCategoriesWithCount } from '@/app/services/adminServices';
import { FishCategory } from '@/app/types/admin/types';
import CategorySearch from './CategorySearch';
import CategoryGrid from './CategoryGrid';
import AddCategoryModal from './AddCategory';

// Types
// interface Product {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     category: string;
//     status: 'pending' | 'approved' | 'rejected';
//     image: string;
//     createdAt: string;
//     vendor: string;
// }

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
    // const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<FishCategory[]>([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
    // const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    // const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-categories-with-count-admin'],
        queryFn: getAllCategoriesWithCount
    });

    useEffect(()=>{
        setCategories(data?.list)
    }, [data])

    useEffect(() => {
        if (categorySearchQuery === '') {
            setCategories(data?.list)
        } else {
            const filteredCategories = categories?.filter(cat =>
                cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
            );
            setCategories(filteredCategories)
        }
    }, [categorySearchQuery])

    // Calculate total active categories
    const totalActiveCategories = data?.list?.length;
    const totalProducts = data?.list?.reduce((sum: number, cat: FishCategory) => sum + cat.productCount, 0);
    const featuredCategories = data?.list?.filter((cat: FishCategory) => cat.feature).length;

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

                {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                </div> */}

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
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories Overview</h3>
                    <div className="space-y-4">
                        {categories?.slice(0, 6).map(category => (
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
                        {categories?.length === 0 && (
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
                            onClick={() => setShowCategoryModal(true)}
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
                categorySearchQuery={categorySearchQuery}
                setActiveTab={setActiveTab}
                allCategories={categories}
                setAllCategories={setCategories}
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
                                    {activeTab === 'categories' && 'Categories'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {activeTab === 'dashboard' && 'Monitor your marketplace performance'}
                                    {activeTab === 'categories' && 'Organize your product categories'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="p-4 lg:p-8">
                        {activeTab === 'dashboard' && <DashboardView />}
                        {activeTab === 'categories' && <CategoriesView />}
                    </div>
                </div>
            </div>
            <AddCategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
            />
        </div>
    );
};

export default AdminPanel;
