import { useState, useCallback } from 'react';
import { DashboardData } from '../types/dashboard';

const HARDCODED_DATA: DashboardData = {
  stats: {
    totalRevenue: 487200,
    revenueGrowthPct: 18,
    totalMembers: 1284,
    memberGrowthPct: 12,
    activeBranches: 4,
    totalBranches: 5,
    newSignupsToday: 23,
    trainersOnline: 9,
  },
  revenueTrend: [
    { label: 'Jan', value: 320000 },
    { label: 'Feb', value: 295000 },
    { label: 'Mar', value: 360000 },
    { label: 'Apr', value: 340000 },
    { label: 'May', value: 410000 },
    { label: 'Jun', value: 390000 },
    { label: 'Jul', value: 487200 },
  ],
  branches: [
    {
      id: 'b1',
      name: 'Downtown',
      city: 'Mumbai',
      memberCount: 412,
      revenue: 182000,
      occupancyPct: 94,
      isOpen: true,
    },
    {
      id: 'b2',
      name: 'Westside',
      city: 'Mumbai',
      memberCount: 318,
      revenue: 136000,
      occupancyPct: 81,
      isOpen: true,
    },
    {
      id: 'b3',
      name: 'Harbor',
      city: 'Pune',
      memberCount: 274,
      revenue: 108000,
      occupancyPct: 67,
      isOpen: true,
    },
    {
      id: 'b4',
      name: 'North Park',
      city: 'Pune',
      memberCount: 196,
      revenue: 61200,
      occupancyPct: 58,
      isOpen: true,
    },
    {
      id: 'b5',
      name: 'Eastgate',
      city: 'Nashik',
      memberCount: 84,
      revenue: 0,
      occupancyPct: 0,
      isOpen: false,
    },
  ],
  recentMembers: [
    {
      id: 'm1',
      name: 'Priya Sharma',
      branchName: 'Downtown',
      joinedAgo: '2h ago',
      status: 'active',
    },
    {
      id: 'm2',
      name: 'Rohit Verma',
      branchName: 'Westside',
      joinedAgo: '5h ago',
      status: 'pending',
    },
    {
      id: 'm3',
      name: 'Anita Desai',
      branchName: 'Harbor',
      joinedAgo: '1d ago',
      status: 'active',
    },
    {
      id: 'm4',
      name: 'Karan Mehta',
      branchName: 'Downtown',
      joinedAgo: '1d ago',
      status: 'overdue',
    },
    {
      id: 'm5',
      name: 'Sneha Patil',
      branchName: 'North Park',
      joinedAgo: '2d ago',
      status: 'active',
    },
  ],
};

interface UseDashboardStatsResult {
  data: DashboardData | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  refresh: () => void;
}

export function useDashboardStats(): UseDashboardStatsResult {
  const [data] = useState<DashboardData>(HARDCODED_DATA);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a short network delay
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return { data, loading: false, refreshing, error: null, refresh };
}
