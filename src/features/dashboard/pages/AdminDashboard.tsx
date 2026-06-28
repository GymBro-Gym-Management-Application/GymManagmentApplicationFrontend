import React, { useCallback, useState } from 'react';
import {
  View, Text, ScrollView, RefreshControl,
  ActivityIndicator, FlatList, Pressable, Alert, StatusBar, Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { T } from '../../trainers/components/theme';

import DashboardHeader from '../components/Dashboardheader';
import RevenueOverviewCard from '../components/Revenueoverviewcard';
import StatTile from '../components/Stattile';
import SectionHeader from '../components/Sectionheader';
import BranchCard from '../components/Branchcard';
import RecentMemberRow from '../components/Recentmemberrow';
import { useDashboardStats } from '../hooks/useDashboardStats';
import AdminModuleDevelopmentDashboard from './AdminModuleDevelopmentDashboard';
import StatsStrip, { StatStripItem } from '../../common/StatsStrip';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

const DASHBOARD_STATS: StatStripItem[] = [
  { icon: 'map-pin',    label: 'Branches', value: '5',     accent: '#AAFF00' },
  { icon: 'award',      label: 'Trainers', value: '18',    accent: '#22D3EE' },
  { icon: 'briefcase',  label: 'Tenants',  value: '3',     accent: '#A78BFA' },
  { icon: 'users',      label: 'Members',  value: '1,284', accent: '#FACC15' },
];

const NAV_ITEMS: { icon: FeatherIconName; label: string; key: string }[] = [
  { icon: 'home',       label: 'Home',       key: 'home'     },
  { icon: 'bar-chart-2',label: 'Statistics', key: 'stats'    },
  { icon: 'cpu',        label: 'AI',         key: 'ai'       },
  { icon: 'settings',   label: 'Settings',   key: 'settings' },
  { icon: 'plus-circle',label: 'Add',        key: 'add'      },
];

interface AdminDashboardProps {
  adminName?: string;
}

export default function AdminDashboard({ adminName = 'Admin' }: AdminDashboardProps) {
  const { data, loading, refreshing, error, refresh } = useDashboardStats();
  const [activeTab, setActiveTab] = useState('home');
  const [showModuleHub, setShowModuleHub] = useState(false);

  const handleNavigate = useCallback((route: string) => {
    Alert.alert('Navigate', `→ ${route}`);
  }, []);

  const handleTab = useCallback((key: string) => {
    setActiveTab(key);
    if (key === 'add') {
      setShowModuleHub(true);
    } else if (key !== 'home') {
      Alert.alert('Navigate', `→ ${key}`);
    }
  }, []);

  // Show module hub overlay
  if (showModuleHub) {
    return (
      <AdminModuleDevelopmentDashboard
        onBack={() => { setShowModuleHub(false); setActiveTab('home'); }}
        onNavigate={(key) => Alert.alert('Open module', `→ ${key}`)}
      />
    );
  }

  if (loading && !data) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={T.brand} />
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Text style={{ color: T.text, fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>
          Something went wrong
        </Text>
        <Text style={{ color: T.textSub, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>{error}</Text>
        <Pressable
          onPress={refresh}
          style={{ backgroundColor: T.brand, borderRadius: 999, paddingHorizontal: 28, paddingVertical: 14 }}
        >
          <Text style={{ color: T.onBrand, fontSize: 16, fontWeight: '700' }}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (!data) return null;

  const { stats, revenueTrend, branches, recentMembers } = data;

  return (
    <View style={{
      flex: 1,
      backgroundColor: T.bg,
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
    }}>
      <StatusBar barStyle="light-content" backgroundColor={T.bg} />

      {/* ── Scrollable content ── */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={T.brand}
            colors={[T.brand]}
          />
        }
      >
        {/* Greeting */}
        <View style={{
          paddingTop: 16,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(34,197,94,0.15)',
          marginBottom: 24,
        }}>
          <DashboardHeader
            adminName={adminName}
            hasUnreadNotifications
            onPressNotifications={() => handleNavigate('Notifications')}
            onPressAvatar={() => handleNavigate('Profile')}
          />
        </View>

        {/* Headline */}
        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 16, color: T.textSub }}>
          Revenue is up{' '}
          <Text style={{ color: T.brand, fontWeight: '700' }}>{stats.revenueGrowthPct}%</Text> this
          month, with {stats.activeBranches} branches running at full strength.
        </Text>

        {/* Quick-glance stats strip */}
        <View style={{ marginBottom: 28 }}>
          <StatsStrip items={DASHBOARD_STATS} />
        </View>

        {/* Revenue overview */}
        <View style={{ marginBottom: 28 }}>
          <RevenueOverviewCard
            totalRevenue={stats.totalRevenue}
            growthPct={stats.revenueGrowthPct}
            trend={revenueTrend}
          />
        </View>

        {/* Stats grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
          <StatTile
            icon="users"
            label="Total members"
            value={stats.totalMembers.toLocaleString('en-IN')}
            deltaLabel={`+${stats.memberGrowthPct}%`}
          />
          <StatTile
            icon="home"
            label="Active branches"
            value={`${stats.activeBranches}/${stats.totalBranches}`}
          />
          <StatTile
            icon="user-plus"
            label="New sign-ups today"
            value={`${stats.newSignupsToday}`}
          />
          <StatTile
            icon="activity"
            label="Trainers online"
            value={`${stats.trainersOnline}`}
          />
        </View>

        {/* Branch performance */}
        <View style={{ marginBottom: 28 }}>
          <SectionHeader
            title="Branch performance"
            onPressAction={() => handleNavigate('Branches')}
          />
          <FlatList
            data={branches}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 4 }}
            renderItem={({ item }) => (
              <BranchCard branch={item} onPress={() => handleNavigate('BranchDetail')} />
            )}
          />
        </View>

        {/* Recent sign-ups */}
        <View style={{ marginBottom: 12 }}>
          <SectionHeader
            title="Recent sign-ups"
            onPressAction={() => handleNavigate('Members')}
          />
          {recentMembers.map((member) => (
            <RecentMemberRow
              key={member.id}
              member={member}
              onPress={() => handleNavigate('MemberDetail')}
            />
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom nav bar — floating glass pill ── */}
      <View style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 32 : 20,
        left: 24,
        right: 24,
        backgroundColor: 'rgba(10,30,15,0.88)',
        borderRadius: 36,
        borderWidth: 1,
        borderColor: 'rgba(34,197,94,0.25)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.55,
        shadowRadius: 24,
        elevation: 18,
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          const isAdd = item.key === 'add';
          return (
            <Pressable
              key={item.key}
              onPress={() => handleTab(item.key)}
              hitSlop={8}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              {isAdd ? (
                <View style={{
                  width: 42, height: 42, borderRadius: 21,
                  backgroundColor: T.brand,
                  alignItems: 'center', justifyContent: 'center',
                  shadowColor: T.brand,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  elevation: 8,
                }}>
                  <Feather name="plus" size={22} color={T.onBrand} />
                </View>
              ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 42 }}>
                  <View style={{
                    width: 42, height: 36, borderRadius: 18,
                    backgroundColor: isActive ? T.brandDim : 'transparent',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Feather
                      name={item.icon}
                      size={21}
                      color={isActive ? T.brand : T.textSub}
                    />
                  </View>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
