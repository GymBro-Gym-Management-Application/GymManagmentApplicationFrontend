import React, { useState } from 'react';
import { View, Pressable, Text, Platform, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HomeScreen          from './screens/HomeScreen';
import TrainScreen         from './screens/TrainScreen';
import PlansScreen         from './screens/PlansScreen';
import ProfileScreen       from './screens/ProfileScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

type Screen =
  | { id: 'home'    }
  | { id: 'train'   }
  | { id: 'plans'   }
  | { id: 'profile' }
  | { id: 'workout'; workoutId: number };

const TABS: { key: string; icon: FeatherIconName; label: string }[] = [
  { key: 'home',    icon: 'home',      label: 'Home'    },
  { key: 'train',   icon: 'activity',  label: 'Train'   },
  { key: 'plans',   icon: 'book-open', label: 'Plans'   },
  { key: 'profile', icon: 'user',      label: 'Profile' },
];

interface Props {
  userId: number;
  onLogout: () => void;
}

export default function MemberApp({ userId, onLogout }: Props) {
  const [screen, setScreen]   = useState<Screen>({ id: 'home' });
  const [activeTab, setActiveTab] = useState('home');

  const goTo = (id: string) => {
    setActiveTab(id);
    setScreen({ id: id as any });
  };

  const navigateFrom = (target: string) => {
    if (target.startsWith('workout-')) {
      const wid = parseInt(target.replace('workout-', ''), 10);
      setScreen({ id: 'workout', workoutId: wid });
      return;
    }
    goTo(target);
  };

  // ── Full-screen sub-routes (no tab bar) ──────────────────────
  if (screen.id === 'workout') {
    return (
      <WorkoutDetailScreen
        workoutId={screen.workoutId}
        userId={userId}
        onBack={() => { setScreen({ id: 'train' }); setActiveTab('train'); }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
      {/* ── Screen content ── */}
      <View style={{ flex: 1 }}>
        {screen.id === 'home' && (
          <HomeScreen userId={userId} onNavigate={navigateFrom} />
        )}
        {screen.id === 'train' && (
          <TrainScreen userId={userId} onOpenWorkout={(id) => setScreen({ id: 'workout', workoutId: id })} />
        )}
        {screen.id === 'plans' && (
          <PlansScreen />
        )}
        {screen.id === 'profile' && (
          <ProfileScreen userId={userId} onLogout={onLogout} />
        )}
      </View>

      {/* ── Bottom tab bar ── */}
      <View style={S.tabBar}>
        {TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => goTo(tab.key)}
              hitSlop={8}
              style={S.tabItem}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
            >
              <View style={[S.tabIcon, active && S.tabIconActive]}>
                <Feather name={tab.icon} size={20} color={active ? '#AAFF00' : '#666666'} />
              </View>
              <Text style={[S.tabLabel, active && S.tabLabelActive]}>{tab.label}</Text>
              {/* Active dot */}
              {active && <View style={S.activeDot} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  tabBar: {
    flexDirection:   'row',
    backgroundColor: '#111111',
    borderTopWidth:  1,
    borderTopColor:  '#1A1A1A',
    paddingBottom:   Platform.OS === 'ios' ? 24 : 8,
    paddingTop:      10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabIcon: {
    width: 42, height: 32, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: 'rgba(170,255,0,0.10)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
  },
  tabLabelActive: {
    color: '#AAFF00',
  },
  activeDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: '#AAFF00',
    marginTop: 1,
  },
});
