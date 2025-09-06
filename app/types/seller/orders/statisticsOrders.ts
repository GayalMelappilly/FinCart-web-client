export interface StatusCounts {
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  pending: number;
  confirmed: number;
}

// Status percentages interface (all values are strings with 2 decimal places)
export interface StatusPercentages {
  processing: string;
  shipped: string;
  delivered: string;
  cancelled: string;
  pending: string;
  confirmed: string;
}

// Financial summary interface
export interface FinancialSummary {
  totalRevenue: number | null;
  averageOrderValue: number | null;
}

// Date range interface
export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

// Main data interface for comprehensive response
export interface OrderStatisticsData {
  totalOrders: number;
  statusCounts: StatusCounts;
  statusPercentages: StatusPercentages;
  financialSummary: FinancialSummary;
  dateRange: DateRange;
}