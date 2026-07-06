import React, { useCallback, useState } from 'react';
import {
  View, Text, ScrollView, RefreshControl,
  ActivityIndicator, FlatList, Pressable, StatusBar, Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { T } from '../../trainers/components/theme';

import DashboardHeader        from '../components/Dashboardheader';
import RevenueOverviewCard    from '../components/Revenueoverviewcard';
import StatTile               from '../components/Stattile';
import SectionHeader          from '../components/Sectionheader';
import BranchCard             from '../components/Branchcard';
import RecentMemberRow        from '../components/Recentmemberrow';
import { useDashboardStats }  from '../hooks/useDashboardStats';
import AdminModuleDevelopmentDashboard from './AdminModuleDevelopmentDashboard';
import StatsStrip, { StatStripItem }   from '../../common/StatsStrip';

// ─── Feature pages ────────────────────────────────────────────────
import ViewMembersPage   from '../../members/pages/ViewMembersPage';
import AddMemberPage     from '../../members/pages/AddMemberPage';
import ViewLeadsPage     from '../../leads/pages/ViewLeadsPage';
import ViewExercisesPage from '../../exercises/pages/ViewExercisesPage';
import ViewWorkoutsPage  from '../../workouts/pages/ViewWorkoutsPage';
import ViewPlansPage     from '../../workouts/pages/ViewPlansPage';
import ViewBranchesPage  from '../../branches/pages/ViewBranchesPage';
import AddBranchPage     from '../../branches/pages/AddBranchPage';
import ViewTenantsPage   from '../../tenants/pages/ViewTenantsPage';
import AddTenantPage     from '../../tenants/pages/AddTenantPage';
import ViewTrainersPage  from '../../trainers/pages/ViewTrainersPage';
import AddTrainerPage    from '../../trainers/pages/AddTrainerPage';
import ModuleAccessPage  from '../../module-access/pages/ModuleAccessPage';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];
type Screen =
  | 'home' | 'module-hub'
  | 'members' | 'add-member'
  | 'trainers' | 'add-trainer'
  | 'branches' | 'add-branch'
  | 'tenants'  | 'add-tenant'
  | 'leads'
  | 'exercises'
  | 'workouts'
  | 'plans'
  | 'module-access';

const DASHBOARD_STATS: StatStripItem[] = [
  { icon: 'map-pin',   label: 'Branches', value: '5',     accent: '#AAFF00' },
  { icon: 'award',     label: 'Trainers', value: '18',    accent: '#22D3EE' },
  { icon: 'briefcase', label: 'Tenants',  value: '3',     accent: '#A78BFA' },
  { icon: 'users',     label: 'Members',  value: '1,284', accent: '#FACC15' },
];

const NAV_ITEMS: { icon: FeatherIconName; label: string; key: string }[] = [
  { icon: 'home',       label: 'Home',    key: 'home'    },
  { icon: 'users',      label: 'Members', key: 'members' },
  { icon: 'plus-circle',label: 'Hub',     key: 'hub'     },
  { icon: 'activity',   label: 'Workouts',key: 'workouts'},
  { icon: 'target',     label: 'Leads',   key: 'leads'   },
];

interface AdminDashboardProps { adminName?: string; }

export default function AdminDashboard({ adminName = 'Admin' }: AdminDashboardProps) {
  const { data, loading, refreshing, error, refresh } = useDashboardStats();
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');

  const go = useCallback((s: Screen) => setScreen(s), []);
  const goHome = useCallback(() => { setScreen('home'); setActiveTab('home'); }, []);

  const handleTab = useCallback((key: string) => {
    setActiveTab(key);
    if (key === 'hub')      go('module-hub');
    else if (key === 'members')  go('members');
    else if (key === 'workouts') go('workouts');
    else if (key === 'leads')    go('leads');
    else                         go('home');
  }, []);

  // ── Sub-page routing ──────────────────────────────────────────
  if (screen === 'module-hub')  return <AdminModuleDevelopmentDashboard onBack={goHome} onNavigate={(k) => go(k as Screen)} />;
  if (screen === 'members')     return <ViewMembersPage   onBack={goHome} onAddMember={() => go('add-member')} />;
  if (screen === 'add-member')  return <AddMemberPage     onBack={() => go('members')} />;
  if (screen === 'trainers')    return <ViewTrainersPage  onBack={goHome} onAddTrainer={() => go('add-trainer')} />;
  if (screen === 'add-trainer') return <AddTrainerPage    onBack={() => go('trainers')} />;
  if (screen === 'branches')    return <ViewBranchesPage  onBack={goHome} onAddBranch={() => go('add-branch')} />;
  if (screen === 'add-branch')  return <AddBranchPage     onBack={() => go('branches')} />;
  if (screen === 'tenants')     return <ViewTenantsPage   onBack={goHome} onAddTenant={() => go('add-tenant')} />;
  if (screen === 'add-tenant')  return <AddTenantPage     onBack={() => go('tenants')} />;
  if (screen === 'leads')       return <ViewLeadsPage     onBack={goHome} />;
  if (screen === 'exercises')   return <ViewExercisesPage onBack={goHome} />;
  if (screen === 'workouts')    return <ViewWorkoutsPage  onBack={goHome} />;
  if (screen === 'plans')       return <ViewPlansPage     onBack={goHome} />;
  if (screen === 'module-access') return <ModuleAccessPage  onBack={goHome} />;

  // ── Loading / Error states ─────────────────────────────────────
  if (loading && !data) return (
    <View style={{ flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={T.brand} />
    </View>
  );

  if (error && !data) return (
    <View style={{ flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
      <Text style={{ color: T.text, fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>Something went wrong</Text>
      <Text style={{ color: T.textSub, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>{error}</Text>
      <Pressable onPress={refresh} style={{ backgroundColor: T.brand, borderRadius: 999, paddingHorizontal: 28, paddingVertical: 14 }}>
        <Text style={{ color: T.onBrand, fontSize: 16, fontWeight: '700' }}>Try again</Text>
      </Pressable>
    </View>
  );

  if (!data) return null;

  const { stats, revenueTrend, branches, recentMembers } = data;

  return (
    <View style={{ flex: 1, backgroundColor: T.bg, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0 }}>
      <StatusBar barStyle="light-content" backgroundColor={T.bg} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={T.brand} colors={[T.brand]} />}
      >
        {/* Greeting */}
        <View style={{ paddingTop: 16, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(34,197,94,0.15)', marginBottom: 24 }}>
          <DashboardHeader
            adminName={adminName}
            hasUnreadNotifications
            onPressNotifications={() => {}}
            onPressAvatar={() => {}}
          />
        </View>

        {/* Headline */}
        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 16, color: T.textSub }}>
          Revenue is up{' '}
          <Text style={{ color: T.brand, fontWeight: '700' }}>{stats.revenueGrowthPct}%</Text> this month, with {stats.activeBranches} branches running at full strength.
        </Text>

        {/* Stats strip */}
        <View style={{ marginBottom: 28 }}>
          <StatsStrip items={DASHBOARD_STATS} />
        </View>

        {/* Revenue */}
        <View style={{ marginBottom: 28 }}>
          <RevenueOverviewCard totalRevenue={stats.totalRevenue} growthPct={stats.revenueGrowthPct} trend={revenueTrend} />
        </View>

        {/* Stat tiles */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
          <StatTile icon="users"     label="Total members"     value={stats.totalMembers.toLocaleString('en-IN')} deltaLabel={`+${stats.memberGrowthPct}%`} />
          <StatTile icon="home"      label="Active branches"   value={`${stats.activeBranches}/${stats.totalBranches}`} />
          <StatTile icon="user-plus" label="New sign-ups today" value={`${stats.newSignupsToday}`} />
          <StatTile icon="activity"  label="Trainers online"   value={`${stats.trainersOnline}`} />
        </View>

        {/* Quick links row */}
        <View style={{ marginBottom: 28 }}>
          <SectionHeader title="Quick access" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
            {[
              { label: 'Members',   icon: 'users'      as FeatherIconName, screen: 'members'   as Screen },
              { label: 'Trainers',  icon: 'award'      as FeatherIconName, screen: 'trainers'  as Screen },
              { label: 'Branches',  icon: 'map-pin'    as FeatherIconName, screen: 'branches'  as Screen },
              { label: 'Tenants',   icon: 'briefcase'  as FeatherIconName, screen: 'tenants'   as Screen },
              { label: 'Leads',     icon: 'target'     as FeatherIconName, screen: 'leads'     as Screen },
              { label: 'Exercises', icon: 'zap'        as FeatherIconName, screen: 'exercises' as Screen },
              { label: 'Workouts',  icon: 'activity'   as FeatherIconName, screen: 'workouts'  as Screen },
              { label: 'Plans',     icon: 'book-open'  as FeatherIconName, screen: 'plans'         as Screen },
              { label: 'Roles',     icon: 'shield'     as FeatherIconName, screen: 'module-access' as Screen },
            ].map(q => (
              <Pressable key={q.screen} onPress={() => go(q.screen)}
                style={({ pressed }) => ({
                  alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 14,
                  backgroundColor: pressed ? 'rgba(170,255,0,0.12)' : '#1A1A1A',
                  borderRadius: 18, borderWidth: 1,
                  borderColor: pressed ? 'rgba(170,255,0,0.30)' : '#222',
                  minWidth: 80,
                })}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(170,255,0,0.10)', borderWidth: 1, borderColor: 'rgba(170,255,0,0.22)', alignItems: 'center', justifyContent: 'center' }}>
                  <Feather name={q.icon} size={18} color="#AAFF00" />
                </View>
                <Text style={{ color: '#AAAAAA', fontSize: 11, fontWeight: '600' }}>{q.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Branch performance */}
        <View style={{ marginBottom: 28 }}>
          <SectionHeader title="Branch performance" onPressAction={() => go('branches')} />
          <FlatList
            data={branches} keyExtractor={(item) => item.id} horizontal
            showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 4 }}
            renderItem={({ item }) => <BranchCard branch={item} onPress={() => go('branches')} />}
          />
        </View>

        {/* Recent sign-ups */}
        <View style={{ marginBottom: 12 }}>
          <SectionHeader title="Recent sign-ups" onPressAction={() => go('members')} />
          {recentMembers.map((member) => (
            <RecentMemberRow key={member.id} member={member} onPress={() => go('members')} />
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={{
        position: 'absolute', bottom: Platform.OS === 'ios' ? 32 : 20,
        left: 24, right: 24,
        backgroundColor: 'rgba(10,30,15,0.92)',
        borderRadius: 36, borderWidth: 1, borderColor: 'rgba(34,197,94,0.25)',
        flexDirection: 'row', alignItems: 'center',
        paddingVertical: 10, paddingHorizontal: 8,
        shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.55, shadowRadius: 24, elevation: 18,
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          const isHub    = item.key === 'hub';
          return (
            <Pressable key={item.key} onPress={() => handleTab(item.key)} hitSlop={8}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              accessibilityRole="button" accessibilityLabel={item.label}>
              {isHub ? (
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: T.brand, alignItems: 'center', justifyContent: 'center', shadowColor: T.brand, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 8 }}>
                  <Feather name="plus" size={22} color={T.onBrand} />
                </View>
              ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 44 }}>
                  <View style={{ width: 44, height: 36, borderRadius: 18, backgroundColor: isActive ? T.brandDim : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <Feather name={item.icon} size={21} color={isActive ? T.brand : T.textSub} />
                  </View>
                  {/* Active indicator dot */}
                  {isActive && <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: T.brand, marginTop: 2 }} />}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
