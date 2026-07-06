import React, { useRef } from 'react';
import {
  View, Text, ScrollView, Pressable, ImageBackground,
  StatusBar, Platform, Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useMyProfile, useMyWorkouts, useMyPlans } from '../api/memberAppQueries';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

// ─── Dashboard images ──────────────────────────────────────────────
const IMG_HERO    = require('../../../assets/dashboard/hero-athlete.jpg');
const IMG_WORKOUT = require('../../../assets/dashboard/workout-1.jpg');
const IMG_COACH1  = require('../../../assets/dashboard/coach-1.jpg');
const IMG_COACH2  = require('../../../assets/dashboard/coach-2.jpg');

const GOAL_COLOR: Record<string, string> = {
  general: '#AAAAAA', weightloss: '#22D3EE',
  musclegain: '#AAFF00', endurance: '#FACC15',
};

const CARD_IMAGES = [IMG_WORKOUT, IMG_COACH1, IMG_COACH2, IMG_HERO];

function SkeletonRow() {
  const op = useRef(new Animated.Value(0.25)).current;
  React.useEffect(() => {
    const l = Animated.loop(Animated.sequence([
      Animated.timing(op, { toValue: 0.6, duration: 700, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0.25, duration: 700, useNativeDriver: true }),
    ]));
    l.start(); return () => l.stop();
  }, []);
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {[0, 1].map(k => (
        <Animated.View key={k} style={{ width: 200, height: 160, borderRadius: 20, backgroundColor: '#1A1A1A', opacity: op }} />
      ))}
    </View>
  );
}

interface Props {
  userId: number;
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ userId, onNavigate }: Props) {
  const { data: profile } = useMyProfile(userId);
  const { data: workoutPage, isLoading: wLoading } = useMyWorkouts(userId, 1);
  const { data: planPage } = useMyPlans(1);

  const workouts  = workoutPage?.items  ?? [];
  const plans     = planPage?.items     ?? [];
  const firstName = profile?.firstName  ?? 'Athlete';

  const hour    = new Date().getHours();
  const greet   = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const quickLinks: { icon: FeatherIconName; label: string; screen: string }[] = [
    { icon: 'activity',  label: 'Train',    screen: 'train'    },
    { icon: 'book-open', label: 'Plans',    screen: 'plans'    },
    { icon: 'zap',       label: 'Exercises',screen: 'exercises'},
    { icon: 'user',      label: 'Profile',  screen: 'profile'  },
  ];

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* ── Hero header ────────────────────────────────── */}
        <ImageBackground
          source={IMG_HERO}
          style={{ width: '100%', height: 260 }}
          resizeMode="cover"
        >
          {/* Dark overlay */}
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.60)', padding: 20, justifyContent: 'space-between' }}>
            {/* Top bar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(170,255,0,0.18)', borderWidth: 1.5, borderColor: '#AAFF00', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#AAFF00', fontSize: 15, fontWeight: '900' }}>
                  {firstName[0]?.toUpperCase() ?? 'M'}
                </Text>
              </View>

              <Pressable onPress={() => onNavigate('notifications')}
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.20)', alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="bell" size={18} color="rgba(255,255,255,0.85)" />
                {/* Unread dot */}
                <View style={{ position: 'absolute', top: 6, right: 7, width: 7, height: 7, borderRadius: 4, backgroundColor: '#AAFF00', borderWidth: 1.5, borderColor: '#0D0D0D' }} />
              </Pressable>
            </View>

            {/* Greeting + headline */}
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: '500', marginBottom: 4 }}>
                {greet}, {firstName} 👋
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.5, lineHeight: 34 }}>
                Ready to{'\n'}
                <Text style={{ color: '#AAFF00' }}>crush it</Text> today?
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* ── Quick links ──────────────────────────────── */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 20, marginBottom: 28 }}>
          {quickLinks.map(q => (
            <Pressable key={q.screen} onPress={() => onNavigate(q.screen)}
              style={({ pressed }) => ({
                flex: 1, alignItems: 'center', gap: 8, paddingVertical: 14,
                backgroundColor: pressed ? 'rgba(170,255,0,0.12)' : '#1A1A1A',
                borderRadius: 18, borderWidth: 1,
                borderColor: pressed ? 'rgba(170,255,0,0.30)' : '#222',
              })}>
              <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(170,255,0,0.10)', borderWidth: 1, borderColor: 'rgba(170,255,0,0.22)', alignItems: 'center', justifyContent: 'center' }}>
                <Feather name={q.icon} size={18} color="#AAFF00" />
              </View>
              <Text style={{ color: '#AAAAAA', fontSize: 10, fontWeight: '600' }}>{q.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* ── My Workouts ─────────────────────────────── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>My Workouts</Text>
            <Pressable onPress={() => onNavigate('train')}
              style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#AAFF00', alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="arrow-up-right" size={16} color="#000" />
            </Pressable>
          </View>

          {wLoading ? (
            <SkeletonRow />
          ) : workouts.length === 0 ? (
            <View style={{ backgroundColor: '#1A1A1A', borderRadius: 18, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#222' }}>
              <Feather name="activity" size={28} color="#444" />
              <Text style={{ color: '#AAAAAA', fontSize: 13, marginTop: 8 }}>No workouts assigned yet</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {workouts.slice(0, 5).map((w, i) => {
                const goal = w.goal?.toLowerCase() ?? 'general';
                const gc   = GOAL_COLOR[goal] ?? '#AAAAAA';
                return (
                  <Pressable key={w.id} onPress={() => onNavigate(`workout-${w.id}`)}
                    style={{ width: 200, height: 160, borderRadius: 20, overflow: 'hidden' }}>
                    <ImageBackground
                      source={CARD_IMAGES[i % CARD_IMAGES.length]}
                      style={{ flex: 1 }} resizeMode="cover">
                      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.60)', padding: 14, justifyContent: 'space-between' }}>
                        {/* Duration pill */}
                        {!!w.durationMin && (
                          <View style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>{w.durationMin} min</Text>
                          </View>
                        )}
                        <View>
                          <Text style={{ color: gc, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{w.goal ?? 'General'}</Text>
                          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: -0.3 }} numberOfLines={2}>{w.name}</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* ── My Plans ────────────────────────────────── */}
        {plans.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>My Plans</Text>
              <Pressable onPress={() => onNavigate('plans')}
                style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#AAFF00', alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="arrow-up-right" size={16} color="#000" />
              </Pressable>
            </View>
            {plans.slice(0, 3).map(plan => {
              const gc = GOAL_COLOR[plan.goal?.toLowerCase() ?? 'general'] ?? '#AAAAAA';
              return (
                <Pressable key={plan.id} onPress={() => onNavigate('plans')}
                  style={({ pressed }) => ({
                    flexDirection: 'row', alignItems: 'center',
                    backgroundColor: pressed ? '#222222' : '#1A1A1A',
                    borderRadius: 16, padding: 14, marginBottom: 10,
                    borderWidth: 1, borderColor: '#222',
                  })}>
                  <View style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: gc + '15', borderWidth: 1, borderColor: gc + '35', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                    <Text style={{ color: gc, fontSize: 16, fontWeight: '900' }}>{plan.durationWeeks}</Text>
                    <Text style={{ color: gc, fontSize: 8, fontWeight: '600' }}>WKS</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }} numberOfLines={1}>{plan.name}</Text>
                    {!!plan.goal && <Text style={{ color: gc, fontSize: 11, marginTop: 2 }}>{plan.goal}</Text>}
                  </View>
                  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: plan.isActive ? 'rgba(170,255,0,0.12)' : '#222', borderWidth: 1, borderColor: plan.isActive ? 'rgba(170,255,0,0.30)' : '#333', alignItems: 'center', justifyContent: 'center' }}>
                    <Feather name="chevron-right" size={14} color={plan.isActive ? '#AAFF00' : '#555'} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* ── Motivational footer ──────────────────────── */}
        <View style={{ marginHorizontal: 20, backgroundColor: '#1A1A1A', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#222', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(170,255,0,0.12)', borderWidth: 1, borderColor: 'rgba(170,255,0,0.25)', alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="zap" size={20} color="#AAFF00" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>Keep the momentum</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 12, marginTop: 2, lineHeight: 17 }}>Every rep counts. Log your session and watch your progress grow.</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
