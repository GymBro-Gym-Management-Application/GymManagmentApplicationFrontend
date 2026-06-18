import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Field, RowGrid, GridCell } from '../trainers/components/FormFields';

// ─── Logo Mark ────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <View className="w-16 h-16 mb-4 items-center justify-center">
      <View className="w-16 h-16 rounded-2xl bg-amber-400 items-center justify-center overflow-hidden">
        <View
          className="absolute w-full h-7 bg-black/20"
          style={{ transform: [{ rotate: '-24deg' }, { translateY: 8 }] }}
        />
        <Text className="text-3xl font-black text-zinc-900 tracking-tight z-10">G</Text>
      </View>
      <View className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-md bg-violet-500" />
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1400));
      // replace with real auth
    } catch {
      setError('Invalid credentials — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0C0C0F]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0C0C0F" />

      {/* ── Ambient glow blobs ── */}
      <View
        className="absolute -top-20 -right-16 w-64 rounded-full bg-amber-400/[0.06]"
        pointerEvents="none"
      />
      <View
        className="absolute -bottom-16 -left-20 w-56 h-56 rounded-full bg-violet-500/[0.05]"
        pointerEvents="none"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-1 items-center justify-center px-5"
          style={{ paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 8, paddingBottom: 24 }}
        >

          {/* ── Brand ── */}
          <View className="items-center mb-7">
            <LogoMark />
            <Text className="text-2xl font-black text-zinc-100 tracking-tight">
              GymManager
            </Text>
            <Text className="text-[13px] text-zinc-400 text-center mt-1.5 leading-5 max-w-[260px]">
              Your performance hub, all in one place
            </Text>
          </View>

          {/* ── Card ── */}
          <View className="w-full max-w-sm rounded-[20px] border border-zinc-800 bg-[#131316] overflow-hidden shadow-2xl">

            {/* Amber top bar */}
            <View className="h-[3px] bg-amber-400" />

            <View className="p-6">
              <Text className="text-[22px] font-extrabold text-zinc-100 tracking-tight mb-1 mt-1">
                Sign in
              </Text>
              <Text className="text-[13px] text-zinc-400 mb-5">
                Access your dashboard
              </Text>

              {/* Hairline */}
              <View className="h-px bg-zinc-800 mb-5" />

              {/* ── Error banner ── */}
              {!!error && (
                <View className="flex-row items-start gap-2 bg-red-400/[0.08] border border-red-400/30 rounded-xl px-3 py-2.5 mb-4">
                  <View className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1" />
                  <Text className="flex-1 text-[13px] text-red-400 leading-[18px]">
                    {error}
                  </Text>
                </View>
              )}

              {/* ── Email ── */}
              <RowGrid>
                <GridCell>
                  <Field
                    label="Email address"
                    value={email}
                    onChangeText={(v) => { setEmail(v); setError(''); }}
                    placeholder="you@gymhq.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </GridCell>
              </RowGrid>

              {/* ── Password ── */}
              <RowGrid>
                <GridCell>
                  <Field
                    label="Password"
                    value={password}
                    onChangeText={(v) => { setPassword(v); setError(''); }}
                    placeholder="••••••••••"
                    secureTextEntry={!showPass}
                    autoCapitalize="none"
                    autoCorrect={false}
                    rightElement={
                      <TouchableOpacity
                        className="px-3.5 py-2.5"
                        onPress={() => setShowPass((p) => !p)}
                        activeOpacity={0.7}
                      >
                        <Text className="text-xs font-semibold text-violet-400">
                          {showPass ? 'Hide' : 'Show'}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                </GridCell>
              </RowGrid>

              {/* ── Forgot password ── */}
              <TouchableOpacity className="self-end mb-5 mt-1" activeOpacity={0.7}>
                <Text className="text-xs font-semibold text-amber-400">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* ── Sign In button ── */}
              <TouchableOpacity
                className={`rounded-xl py-[15px] items-center overflow-hidden bg-amber-400 ${loading ? 'opacity-50' : ''}`}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.88}
              >
                {/* Button sheen */}
                <View
                  className="absolute top-0 w-[36%] h-full bg-white/10"
                  style={{ left: '10%', transform: [{ skewX: '-18deg' }] }}
                />
                {loading
                  ? <ActivityIndicator color="#0C0C0F" />
                  : <Text className="text-[15px] font-extrabold text-zinc-900 tracking-wide">
                      Sign In →
                    </Text>
                }
              </TouchableOpacity>

              {/* ── Or divider ── */}
              {/* <View className="flex-row items-center gap-2.5 my-5">
                <View className="flex-1 h-px bg-zinc-800" />
                <Text className="text-xs font-medium text-zinc-600">or</Text>
                <View className="flex-1 h-px bg-zinc-800" />
              </View> */}

              {/* ── SSO placeholder ── */}
              {/* <TouchableOpacity
                className="rounded-xl py-3 items-center border border-zinc-800 min-h-[44px]"
                activeOpacity={0.8}
              /> */}
            </View>
          </View>

          {/* ── Footer ── */}
          <View className="flex-row items-center justify-center mt-6 gap-2">
            <View className="w-1 h-1 rounded-full bg-zinc-700" />
            <Text className="text-[11px] text-zinc-700">
              Gym Management System · 2025
            </Text>
            <View className="w-1 h-1 rounded-full bg-zinc-700" />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
