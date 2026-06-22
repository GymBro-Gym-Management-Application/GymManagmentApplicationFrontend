import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, Pressable,
  StatusBar, Platform, Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { T } from '../../trainers/components/theme';
import AddTrainerPage from '../../trainers/pages/AddTrainerPage';
import AddBranchPage from '../../branches/pages/AddBranchPage';
import ViewBranchesPage from '../../branches/pages/ViewBranchesPage';
import StatsStrip from '../../common/StatsStrip';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

// ─── Data ─────────────────────────────────────────────────────────
interface ModuleItem {
  key: string;
  label: string;
  sublabel: string;
  description: string;
  icon: FeatherIconName;
  accent: string;
  accentDim: string;
  accentBorder: string;
  stat: string;
  statLabel: string;
  tag: string;
}

const MODULES: ModuleItem[] = [
  {
    key: 'branch',
    label: 'Branch',
    sublabel: 'Add new location',
    description: 'Register gym branch, set capacity & hours',
    icon: 'map-pin',
    accent: '#AAFF00',
    accentDim: 'rgba(170,255,0,0.10)',
    accentBorder: 'rgba(170,255,0,0.22)',
    stat: '5',
    statLabel: 'locations',
    tag: 'Locations',
  },
  {
    key: 'trainer',
    label: 'Trainer',
    sublabel: 'Onboard staff',
    description: 'Assign specializations & branch',
    icon: 'award',
    accent: '#22D3EE',
    accentDim: 'rgba(34,211,238,0.10)',
    accentBorder: 'rgba(34,211,238,0.22)',
    stat: '18',
    statLabel: 'trainers',
    tag: 'Staff',
  },
  {
    key: 'tenant',
    label: 'Tenant',
    sublabel: 'New organisation',
    description: 'Create tenant with plan & admin access',
    icon: 'briefcase',
    accent: '#A78BFA',
    accentDim: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.22)',
    stat: '3',
    statLabel: 'tenants',
    tag: 'Tenants',
  },
  {
    key: 'client',
    label: 'Client',
    sublabel: 'Enrol member',
    description: 'Assign plan, branch & trainer',
    icon: 'user-plus',
    accent: '#FACC15',
    accentDim: 'rgba(250,204,21,0.10)',
    accentBorder: 'rgba(250,204,21,0.22)',
    stat: '1,284',
    statLabel: 'members',
    tag: 'Members',
  },
];

const SUMMARY_ITEMS = [
  { icon: 'map-pin' as FeatherIconName,   label: 'Branches', value: '5',     accent: '#AAFF00' },
  { icon: 'award' as FeatherIconName,     label: 'Trainers', value: '18',    accent: '#22D3EE' },
  { icon: 'briefcase' as FeatherIconName, label: 'Tenants',  value: '3',     accent: '#A78BFA' },
  { icon: 'users' as FeatherIconName,     label: 'Members',  value: '1,284', accent: '#FACC15' },
];

// ─── Animated card (full-width row) ──────────────────────────────
function ModuleCard({
  mod,
  onPressAdd,
  onPressView,
}: {
  mod: ModuleItem;
  onPressAdd: () => void;
  onPressView: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 5 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], marginBottom: 14 }}>
      <Pressable
        onPress={onPressView}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel={mod.label}
        style={{
          borderRadius: 24,
          // overflow removed — it blocks nested Pressable events on Android
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.10)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.50,
          shadowRadius: 22,
          elevation: 12,
        }}
      >
        {/* Accent top strip — rounded top corners manually since overflow is off */}
        <View style={{
          height: 3,
          backgroundColor: mod.accent,
          opacity: 0.9,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }} />

        <View style={{ padding: 20 }}>
          {/* Top row — icon badge + tag + arrow */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{
              width: 52, height: 52, borderRadius: 16,
              backgroundColor: mod.accentDim,
              borderWidth: 1, borderColor: mod.accentBorder,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Feather name={mod.icon} size={24} color={mod.accent} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{
                borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5,
                backgroundColor: mod.accentDim,
                borderWidth: 1, borderColor: mod.accentBorder,
              }}>
                <Text style={{ color: mod.accent, fontSize: 11, fontWeight: '700', letterSpacing: 0.4 }}>
                  {mod.tag}
                </Text>
              </View>
              {/* Arrow → navigates to view page */}
              <Pressable
                onPress={onPressView}
                hitSlop={8}
                style={{
                  width: 34, height: 34, borderRadius: 17,
                  backgroundColor: mod.accentDim,
                  borderWidth: 1, borderColor: mod.accentBorder,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Feather name="arrow-up-right" size={17} color={mod.accent} />
              </Pressable>
            </View>
          </View>

          {/* Title + sublabel */}
          <Text style={{ color: T.text, fontSize: 19, fontWeight: '800', letterSpacing: -0.4 }}>
            {mod.label}
          </Text>
          <Text style={{ color: T.textSub, fontSize: 13, marginTop: 3, marginBottom: 10 }}>
            {mod.sublabel}
          </Text>

          {/* Description */}
          <Text style={{ color: T.textFaint, fontSize: 13, lineHeight: 19, marginBottom: 18 }}>
            {mod.description}
          </Text>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginBottom: 16 }} />

          {/* Stats + CTA row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: mod.accent, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 }}>
                {mod.stat}
              </Text>
              <Text style={{ color: T.textSub, fontSize: 11, marginTop: 2 }}>{mod.statLabel}</Text>
            </View>

            {/* Add new → navigates to add page */}
            <Pressable
              onPress={onPressAdd}
              hitSlop={8}
              style={({ pressed }) => ({
                flexDirection: 'row', alignItems: 'center', gap: 8,
                backgroundColor: pressed ? mod.accent : mod.accentDim,
                borderWidth: 1, borderColor: mod.accentBorder,
                borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9,
              })}
            >
              {({ pressed }) => (
                <>
                  <Feather name="plus" size={15} color={pressed ? T.onBrand : mod.accent} />
                  <Text style={{ color: pressed ? T.onBrand : mod.accent, fontSize: 13, fontWeight: '700' }}>
                    Add new
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
interface AdminModuleDevelopmentDashboardProps {
  onNavigate?: (key: string) => void;
  onBack?: () => void;
}

export default function AdminModuleDevelopmentDashboard({
  onNavigate,
  onBack,
}: AdminModuleDevelopmentDashboardProps) {
  const [activePage, setActivePage] = useState<string | null>(null);

  // ── Sub-page routing ──────────────────────────────────────────
  if (activePage === 'trainer') {
    return <AddTrainerPage onBack={() => setActivePage(null)} />;
  }
  if (activePage === 'branch') {
    return <AddBranchPage onBack={() => setActivePage(null)} />;
  }
  if (activePage === 'view-branches') {
    return (
      <ViewBranchesPage
        onBack={() => setActivePage(null)}
        onAddBranch={() => setActivePage('branch')}
      />
    );
  }

  const handleNavigate = (key: string) => {
    // add pages
    if (key === 'trainer') { setActivePage('trainer'); return; }
    if (key === 'branch')  { setActivePage('branch');  return; }
    // view pages — map module key → view route
    if (key === 'view-branchs')  { setActivePage('view-branches'); return; }
    if (key === 'view-trainers') { setActivePage('view-trainers'); return; }
    // fallback
    onNavigate?.(key);
  };
  return (
    <View style={{
      flex: 1,
      backgroundColor: T.bg,
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
    }}>
      <StatusBar barStyle="light-content" backgroundColor={T.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* ── Hero header ── */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 28,
        }}>
          {/* Back + title row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            {onBack && (
              <Pressable
                onPress={onBack}
                hitSlop={12}
                style={{
                  width: 42, height: 42, borderRadius: 21,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
                  alignItems: 'center', justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <Feather name="arrow-left" size={20} color={T.text} />
              </Pressable>
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.textSub, fontSize: 11, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 3 }}>
                Admin
              </Text>
              <Text style={{ color: T.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 }}>
                Module Hub
              </Text>
            </View>
            {/* Green dot status */}
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: T.brand }} />
                <Text style={{ color: T.brand, fontSize: 12, fontWeight: '700' }}>Live</Text>
              </View>
            </View>
          </View>

          {/* Hero description */}
          <Text style={{
            color: T.textSub, fontSize: 14, lineHeight: 21, marginBottom: 24,
          }}>
            Manage your gym ecosystem — add branches, onboard trainers,
            register tenants and enrol clients from one place.
          </Text>

          {/* Summary strip */}
          <StatsStrip items={SUMMARY_ITEMS} />
        </View>

        {/* ── Section label ── */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 20, marginBottom: 16,
        }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />
          <Text style={{ color: T.textFaint, fontSize: 11, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', paddingHorizontal: 12 }}>
            Quick add
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />
        </View>

        {/* ── Full-width card list ── */}
        <View style={{ paddingHorizontal: 20 }}>
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.key}
              mod={mod}
              onPressAdd={() => handleNavigate(mod.key)}
              onPressView={() => handleNavigate(`view-${mod.key}s`)}
            />
          ))}
        </View>

        {/* ── Recent activity section ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={{ color: T.text, fontSize: 17, fontWeight: '700', marginBottom: 14 }}>
            Recent activity
          </Text>

          {[
            { icon: 'map-pin' as FeatherIconName,   accent: '#AAFF00', title: 'Downtown branch added',    sub: 'Mumbai · 2h ago' },
            { icon: 'award' as FeatherIconName,      accent: '#22D3EE', title: 'Ravi K. onboarded',       sub: 'Trainer · Westside · 5h ago' },
            { icon: 'user-plus' as FeatherIconName,  accent: '#FACC15', title: '23 new members enrolled', sub: 'Today · all branches' },
          ].map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: 16, padding: 14, marginBottom: 10,
              }}
            >
              <View style={{
                width: 38, height: 38, borderRadius: 12,
                backgroundColor: item.accent + '18',
                borderWidth: 1, borderColor: item.accent + '30',
                alignItems: 'center', justifyContent: 'center',
                marginRight: 12,
              }}>
                <Feather name={item.icon} size={17} color={item.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: T.text, fontSize: 14, fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: T.textSub, fontSize: 11, marginTop: 2 }}>{item.sub}</Text>
              </View>
              <Feather name="chevron-right" size={16} color={T.textFaint} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
