import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

// ─── Logo Mark ────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <View className="w-16 h-16 mb-4 items-center justify-center">
      {/* Main block */}
      <View className="w-[60px] h-[60px] rounded-2xl bg-[#F59E0B] items-center justify-center overflow-hidden">
        {/* Diagonal slash */}
        <View
          className="absolute w-[110%] h-7 bg-black/20"
          style={{ transform: [{ rotate: '-24deg' }, { translateY: 8 }] }}
        />
        <Text className="text-[28px] font-black text-[#0C0C0F] tracking-tight z-10">
          G
        </Text>
      </View>
      {/* Violet corner accent */}
      <View className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-[5px] bg-[#8B5CF6]" />
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState<'email' | 'password' | null>(null);
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

  // Input border class driven by focus + error state
  const emailBorder =
    error           ? 'border-[#F87171]/50'
    : focused === 'email' ? 'border-[#8B5CF6]'
    : 'border-[#22222A]';

  const passBorder =
    error               ? 'border-[#F87171]/50'
    : focused === 'password' ? 'border-[#8B5CF6]'
    : 'border-[#22222A]';

  const emailBg = focused === 'email' ? 'bg-[#1F1F27]' : 'bg-[#1A1A1F]';
  const passBg  = focused === 'password' ? 'bg-[#1F1F27]' : 'bg-[#1A1A1F]';

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0C0C0F]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0C0C0F" />

      {/* ── Ambient glow blobs (decorative, non-interactive) ── */}
      <View
        className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-[#F59E0B]/[0.06]"
        style={{ pointerEvents: 'none' }}
      />
      <View
        className="absolute -bottom-16 -left-20 w-56 h-56 rounded-full bg-[#8B5CF6]/[0.05]"
        style={{ pointerEvents: 'none' }}
      />

      {/* ── Full-screen fixed layout — no scroll ── */}
      <View
        className="flex-1 items-center justify-center px-5"
        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0 }}
      >

        {/* ── Brand ── */}
        <View className="items-center mb-7">
          <LogoMark />

          <Text className="text-[26px] font-black text-[#F4F4F5] tracking-tight">
            GymManager
          </Text>

          {/* ADMIN badge */}
          <View className="mt-2 mb-1 px-2 py-[3px] rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30">
            <Text className="text-[10px] font-bold text-[#F59E0B] tracking-[1.5px]">
              ADMIN
            </Text>
          </View>

          <Text className="text-[13px] text-[#9CA3AF] text-center mt-1 leading-5 max-w-[260px]">
            Your performance hub, all in one place
          </Text>
        </View>

        {/* ── Card ── */}
        <View className="w-full max-w-sm rounded-[20px] border border-[#22222A] bg-[#131316] overflow-hidden"
          style={{
            boxShadow: '0px 12px 24px 0px rgba(0,0,0,0.5)',
            elevation: 16,
          }}
        >
          {/* Amber top bar */}
          <View className="h-[3px] bg-[#F59E0B]" />

          <View className="p-6">
            <Text className="text-[22px] font-extrabold text-[#F4F4F5] tracking-tight mb-1 mt-1">
              Sign in
            </Text>
            <Text className="text-[13px] text-[#9CA3AF] mb-5">
              Access your dashboard
            </Text>

            {/* Hairline */}
            <View className="h-px bg-[#22222A] mb-5" />

            {/* ── Error banner ── */}
            {!!error && (
              <View className="flex-row items-start gap-2 bg-[#F87171]/[0.08] border border-[#F87171]/30 rounded-xl px-3 py-[10px] mb-4">
                <View className="w-[6px] h-[6px] rounded-full bg-[#F87171] mt-[4px]" />
                <Text className="flex-1 text-[13px] text-[#F87171] leading-[18px]">
                  {error}
                </Text>
              </View>
            )}

            {/* ── Email ── */}
            <View className="mb-[14px]">
              <Text className={`text-[12px] font-semibold mb-[6px] tracking-[0.1px] ${focused === 'email' ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]'}`}>
                Email address
              </Text>
              <TextInput
                className={`rounded-xl border px-[14px] py-[13px] text-[14px] text-[#F4F4F5] ${emailBg} ${emailBorder}`}
                value={email}
                onChangeText={(v) => { setEmail(v); setError(''); }}
                placeholder="you@gymhq.com"
                placeholderTextColor="#3F3F52"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>

            {/* ── Password ── */}
            <View className="mb-[14px]">
              <Text className={`text-[12px] font-semibold mb-[6px] tracking-[0.1px] ${focused === 'password' ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]'}`}>
                Password
              </Text>
              <View className={`flex-row items-center rounded-xl border pl-[14px] ${passBg} ${passBorder}`}>
                <TextInput
                  className="flex-1 py-[13px] text-[14px] text-[#F4F4F5]"
                  value={password}
                  onChangeText={(v) => { setPassword(v); setError(''); }}
                  placeholder="••••••••••"
                  placeholderTextColor="#3F3F52"
                  secureTextEntry={!showPass}
                  autoCapitalize="none"
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <TouchableOpacity
                  className="px-[14px] py-[13px]"
                  onPress={() => setShowPass((p) => !p)}
                  activeOpacity={0.7}
                >
                  <Text className="text-[12px] font-semibold text-[#8B5CF6]">
                    {showPass ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Forgot password ── */}
            <TouchableOpacity className="self-end mb-[22px] mt-[2px]" activeOpacity={0.7}>
              <Text className="text-[12px] font-semibold text-[#F59E0B]">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* ── Sign In button ── */}
            <TouchableOpacity
              className={`rounded-xl py-[15px] items-center overflow-hidden relative ${loading ? 'opacity-55' : ''}`}
              style={{
                backgroundColor: '#F59E0B',
                boxShadow: '0px 6px 12px 0px rgba(245,158,11,0.35)',
                elevation: 8,
              }}
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
                : <Text className="text-[15px] font-extrabold text-[#0C0C0F] tracking-[0.2px]">
                    Sign In →
                  </Text>
              }
            </TouchableOpacity>

            {/* ── Or divider ── */}
            <View className="flex-row items-center gap-[10px] my-5">
              <View className="flex-1 h-px bg-[#22222A]" />
              <Text className="text-[12px] font-medium text-[#3F3F52]">or</Text>
              <View className="flex-1 h-px bg-[#22222A]" />
            </View>

            {/* ── SSO button ── */}
            <TouchableOpacity
              className="rounded-xl py-[13px] items-center border border-[#22222A] bg-transparent"
              activeOpacity={0.8}
            >
              <Text className="text-[14px] font-semibold text-[#9CA3AF]">
                Continue with SSO
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Footer ── */}
        <View className="flex-row items-center justify-center mt-6 gap-2">
          <View className="w-[3px] h-[3px] rounded-full bg-[#3F3F52]" />
          <Text className="text-[11px] text-[#3F3F52]">
            Gym Management System · 2025
          </Text>
          <View className="w-[3px] h-[3px] rounded-full bg-[#3F3F52]" />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}