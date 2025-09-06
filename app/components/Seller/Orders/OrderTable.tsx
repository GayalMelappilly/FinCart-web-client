'use client'

import { getAllOrders, orderAction } from '@/app/services/sellerAuthServices'
import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query'
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Eye, TruckIcon, ChevronLeft, ChevronRight, X, User, CreditCard, Package, Calendar, Phone, Mail, FileVideo } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import Spinner from '../../LoadingSpinner/Spinner'
import { Orders } from '@/app/types/seller/orders/types'
import { useToast } from '@/app/providers/ToastProvider'
import StatusSpinner from '../../LoadingSpinner/StatusSpinner'

type Props = {
    activeTab: string,
    searchTerm: string
}

const OrderTable: FC<Props> = ({ activeTab, searchTerm }) => {
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [statusLoading, setStatusLoading] = useState<string | null>(null)
    const [orders, setOrders] = useState<Orders>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)
    const ordersPerPage: number = 10;

    const { showToast } = useToast()

    // Use React Query v5 syntax with placeholderData
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['get-all-orders-seller', currentPage, ordersPerPage, activeTab, searchTerm],
        queryFn: () => getAllOrders(currentPage, ordersPerPage),
        placeholderData: keepPreviousData,
        staleTime: 30000,
    });

    const orderActionMutation = useMutation({
        mutationFn: orderAction,
        onSuccess: (data) => {
            console.log(data)
            const updatedOrder = sortedOrders.find(item => item.id === data.data.order.id);
            if (updatedOrder) {
                updatedOrder.status = data.data.order.status
            }
            showToast('success', 'Status updated')
            setStatusLoading(null)
        },
        onError: (err) => {
            console.log('Password update failed : ', err)
            showToast('error', 'Failed to update status')
        }
    })

    useEffect(() => {
        if (data?.data) {
            setOrders(data.data.orders);
            setTotalPages(data.data.pagination.pages);
            setTotalOrders(data.data.pagination.total);
        }
    }, [data])

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    // Handle modal
    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
        setShowModal(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [showModal]);

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const HandleOrderAction = (action: string, orderId: string) => {
        setStatusLoading(orderId)
        orderActionMutation.mutate({ action, orderId })
    }

    const HandleOrderReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>, action: string, orderId: string) => {
        // setStatusLoading(orderId)
    }

    // Filter orders client-side
    const filteredOrders = orders?.filter((order: any) => {
        if (activeTab !== 'All' && order.status !== activeTab) {
            return false;
        }

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                order.id.toLowerCase().includes(searchLower) ||
                order.users.full_name.toLowerCase().includes(searchLower) ||
                order.users.email.toLowerCase().includes(searchLower)
            );
        }

        return true;
    }) || [];

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;

        switch (sortColumn) {
            case 'date':
                return multiplier * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            case 'amount':
                return multiplier * (Number(a.total_amount) - Number(b.total_amount));
            case 'customer':
                return multiplier * a.users.full_name.localeCompare(b.users.full_name);
            default:
                return 0;
        }
    });

    // Fast pagination handlers
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'shipped':
                return <TruckIcon className="h-4 w-4 text-blue-600" />;
            case 'processing':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'cancelled':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-orange-600" />;
            default:
                return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'processing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
            case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    // Show spinner only for initial load (no previous data)
    if (isLoading && !data) return <Spinner />

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Loading overlay for pagination */}
                {isFetching && data && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                        <div className="flex items-center space-x-2">
                            <Spinner />
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('customer')}
                                >
                                    <div className="flex items-center">
                                        Customer
                                        {sortColumn === 'customer' && (
                                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('date')}
                                >
                                    <div className="flex items-center">
                                        Date
                                        {sortColumn === 'date' && (
                                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center">
                                        Amount
                                        {sortColumn === 'amount' && (
                                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                        )}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white divide-y divide-gray-200 ${isFetching ? 'opacity-60' : ''}`}>
                            {sortedOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        ORD-{order.id.slice(0, 6)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.users.full_name}</div>
                                        <div className="text-xs text-gray-500">{order.users.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">₹{Number(order.total_amount).toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">{order.order_items.length} items</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {statusLoading === order.id ?
                                            <span>
                                                <StatusSpinner />
                                            </span>
                                            :
                                            <span className="flex items-center">
                                                <StatusIcon status={order.status} />
                                                <span className={`ml-1.5 text-sm font-medium capitalize
                            ${order.status === 'delivered' ? 'text-green-600' :
                                                        order.status === 'shipped' ? 'text-blue-600' :
                                                            order.status === 'processing' ? 'text-yellow-600' :
                                                                order.status === 'pending' ? 'text-orange-600' :
                                                                    'text-red-600'}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {statusLoading === order.id ?
                                            <div>
                                                <StatusSpinner />
                                            </div>
                                            :
                                            <div className='flex gap-2'>
                                                {order.status === 'processing' ?
                                                    // <div className="h-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer">
                                                    //     <input
                                                    //         type="file"
                                                    //         id="imageUpload"
                                                    //         className="hidden"
                                                    //         accept="image/*"
                                                    //         onChange={(e) => HandleOrderReceiptUpload(e, 'receipt', order.id)}
                                                    //     />
                                                    //     <label htmlFor="imageUpload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                    //         <FileVideo className="h-8 w-8 text-gray-400" />
                                                    //         <span className="mt-2 text-sm text-gray-500">Add Image/Video</span>
                                                    //     </label>
                                                    // </div>
                                                    <button
                                                        disabled={isFetching}
                                                        className='p-2 bg-blue-400 rounded-md text-sm text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                                        // onClick={() => HandleOrderAction('accept', order.id)}
                                                    >
                                                        Upload Receipt
                                                    </button>
                                                    :
                                                    <button
                                                        disabled={isFetching}
                                                        className='p-2 bg-green-400 rounded-md text-sm text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                                        onClick={() => HandleOrderAction('accept', order.id)}
                                                    >
                                                        Accept
                                                    </button>
                                                }
                                                <button
                                                    disabled={isFetching}
                                                    className='p-2 bg-red-500/90 rounded-md text-sm text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                                    onClick={() => HandleOrderAction('decline', order.id)}
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            disabled={isFetching}
                                            onClick={() => handleViewOrder(order)}
                                            className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Enhanced Pagination */}
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1 || isFetching}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages || isFetching}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * ordersPerPage + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(currentPage * ordersPerPage, totalOrders)}</span> of{' '}
                                <span className="font-medium">{totalOrders}</span> results
                                {isFetching && <span className="text-blue-600 ml-2">(Updating...)</span>}
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1 || isFetching}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {/* Page numbers */}
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => goToPage(pageNum)}
                                            disabled={isFetching}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNum === currentPage
                                                ? 'z-10 bg-blue-600 text-white focus:z-20'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50'
                                                }`}
                                        >
                                            {pageNum === currentPage && isFetching ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                pageNum
                                            )}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages || isFetching}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={closeModal}
                        ></div>

                        {/* Modal panel */}
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                            {/* Header */}
                            <div className="bg-white px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Order Details
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Order ID: ORD-{selectedOrder.id.slice(0, 8)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="bg-white px-6 py-6 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Order Items - Takes 2 columns on large screens */}
                                    <div className="lg:col-span-2">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                                                <Package className="h-5 w-5 mr-2" />
                                                Order Items
                                            </h4>
                                            <div className="space-y-4">
                                                {selectedOrder.order_items.map((item: any, index: number) => (
                                                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <div className="flex items-start space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={item.fish_listings.images[0]}
                                                                    alt={item.fish_listings.name}
                                                                    className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                                                                    {item.fish_listings.name}
                                                                </h5>
                                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                                    <div>
                                                                        <span className="font-medium">Unit Price:</span> ₹{Number(item.unit_price).toFixed(2)}
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-medium">Quantity:</span> {item.quantity}
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 text-right">
                                                                    <span className="text-lg font-semibold text-gray-900">
                                                                        ₹{Number(item.total_price).toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Summary - Takes 1 column */}
                                    <div className="space-y-6">
                                        {/* Customer Info */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                                                <User className="h-5 w-5 mr-2" />
                                                Customer Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center text-sm">
                                                    <User className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-900 font-medium">{selectedOrder.users.full_name}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-600">{selectedOrder.users.email}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-600">
                                                        {selectedOrder.users.phone_number || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Status */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-md font-semibold text-gray-900 mb-4">
                                                Order Status
                                            </h4>
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                                                <StatusIcon status={selectedOrder.status} />
                                                <span className="ml-2 capitalize">{selectedOrder.status}</span>
                                            </div>
                                            <div className="mt-3 text-sm text-gray-600 flex items-center">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Ordered on {new Date(selectedOrder.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                                                <CreditCard className="h-5 w-5 mr-2" />
                                                Payment Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Payment Method:</span>
                                                    <span className="text-gray-900 font-medium capitalize">
                                                        {selectedOrder.payment_details.payment_method}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Payment Status:</span>
                                                    <span className={`font-medium capitalize ${selectedOrder.payment_details.status === 'completed'
                                                        ? 'text-green-600'
                                                        : 'text-orange-600'
                                                        }`}>
                                                        {selectedOrder.payment_details.status}
                                                    </span>
                                                </div>
                                                {selectedOrder.payment_details.payment_date && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Payment Date:</span>
                                                        <span className="text-gray-900">
                                                            {new Date(selectedOrder.payment_details.payment_date).toLocaleDateString('en-GB')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Total */}
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <h4 className="text-md font-semibold text-gray-900 mb-4">
                                                Order Total
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Subtotal:</span>
                                                    <span className="text-gray-900">
                                                        ₹{(Number(selectedOrder.total_amount) - 50).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Shipping:</span>
                                                    <span className="text-gray-900">₹50.00</span>
                                                </div>
                                                <div className="border-t border-blue-200 pt-2">
                                                    <div className="flex justify-between text-lg font-semibold">
                                                        <span className="text-gray-900">Total:</span>
                                                        <span className="text-blue-600">
                                                            ₹{Number(selectedOrder.total_amount).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500"
                                    >
                                        Print Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderTable
