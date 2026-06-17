import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
  ActivityIndicator, StatusBar, Platform,
} from 'react-native';
import { useCreateTrainer } from '../api/trainerQueries';
import { defaultTrainerValues } from '../hooks/useTrainerDefaults';
import { TrainerPayload } from '../types/trainer.types';
import { T, Shadow } from '../components/theme';
import StepIndicator from '../components/StepIndicator';
import StepBasicInfo from '../components/StepBasicInfo';
import StepEmployment from '../components/StepEmployment';
import StepSalary from '../components/StepSalary';
import StepPaymentDetails from '../components/StepPaymentDetails';
import StepAvailability from '../components/StepAvailability';
import StepBookingCommission from '../components/StepBookingCommission';
import StepCertDocuments from '../components/StepCertDocuments';
import StepMiscellaneous from '../components/StepMiscellaneous';

const STEP_LABELS = [
  'Basic Info', 'Employment', 'Salary', 'Payment Details',
  'Availability', 'Booking & Commission', 'Certs & Docs', 'Other Details',
];

export default function AddTrainerPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<TrainerPayload>({ ...defaultTrainerValues });
  const { mutate, isPending } = useCreateTrainer();

  const updateForm = (fields: Partial<TrainerPayload>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: (res) => Alert.alert(res.success ? '✓ Success' : 'Error', res.message ?? 'Something went wrong.'),
      onError: () => Alert.alert('Error', 'Failed to connect to server.'),
    });
  };

  const steps = [
    <StepBasicInfo data={formData} onChange={updateForm} />,
    <StepEmployment data={formData} onChange={updateForm} />,
    <StepSalary data={formData} onChange={updateForm} />,
    <StepPaymentDetails data={formData} onChange={updateForm} />,
    <StepAvailability data={formData} onChange={updateForm} />,
    <StepBookingCommission data={formData} onChange={updateForm} />,
    <StepCertDocuments data={formData} onChange={updateForm} />,
    <StepMiscellaneous data={formData} onChange={updateForm} />,
  ];

  const isLast = step === steps.length - 1;
  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={T.surface} />

      {/* HEADER */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <View style={s.headerIconBox}>
            <Text style={s.headerEmoji}>🏋️</Text>
          </View>
          <View>
            <Text style={s.eyebrow}>NEW TRAINER</Text>
            <Text style={s.title}>Add Trainer</Text>
          </View>
        </View>
        <View style={s.progressBadge}>
          <Text style={s.progressPct}>{progress}%</Text>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${progress}%` as any }]} />
          </View>
          <Text style={s.progressSub}>{step + 1} of {steps.length}</Text>
        </View>
      </View>

      {/* STEP TAB STRIP */}
      <StepIndicator current={step} total={steps.length} labels={STEP_LABELS} onStepPress={(i) => i < step && setStep(i)} />

      {/* CONTENT */}
      <View style={s.content}>{steps[step]}</View>

      {/* FOOTER */}
      <View style={s.footer}>
        <TouchableOpacity
          style={[s.btn, s.btnBack, step === 0 && s.btnDisabled]}
          onPress={() => setStep((p) => p - 1)}
          disabled={step === 0}
          activeOpacity={0.7}
        >
          <Text style={[s.btnBackText, step === 0 && { color: T.border }]}>← Back</Text>
        </TouchableOpacity>

        {!isLast ? (
          <TouchableOpacity style={[s.btn, s.btnNext]} onPress={() => setStep((p) => p + 1)} activeOpacity={0.8}>
            <Text style={s.btnPrimaryText}>Continue →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[s.btn, s.btnSubmit]} onPress={handleSubmit} disabled={isPending} activeOpacity={0.8}>
            {isPending
              ? <ActivityIndicator color={T.primaryFg} />
              : <Text style={s.btnPrimaryText}>✓  Submit Trainer</Text>
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: T.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: T.neonGlowFaint,
    borderWidth: 1, borderColor: T.neonBorder,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: T.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 6,
  },
  headerEmoji: { fontSize: 20 },
  eyebrow: { fontSize: 10, fontWeight: '800', color: T.primary, letterSpacing: 2, marginBottom: 1 },
  title: { fontSize: 20, fontWeight: '800', color: T.foreground },
  progressBadge: { alignItems: 'flex-end', gap: 4 },
  progressPct: { fontSize: 15, fontWeight: '800', color: T.primary },
  progressTrack: { width: 72, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.10)', overflow: 'hidden' },
  progressFill: { height: 5, borderRadius: 3, backgroundColor: T.primary },
  progressSub: { fontSize: 10, color: T.mutedFg, letterSpacing: 0.5 },
  content: { flex: 1 },
  footer: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
  },
  btn: { borderRadius: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnBack: {
    flex: 1, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
  },
  btnDisabled: { opacity: 0.35 },
  btnBackText: { color: T.mutedFg, fontWeight: '700', fontSize: 14 },
  btnNext: { flex: 2, backgroundColor: T.primary, ...Shadow.neon },
  btnSubmit: { flex: 2, backgroundColor: T.accent, ...Shadow.amber },
  btnPrimaryText: { color: T.primaryFg, fontWeight: '800', fontSize: 15 },
});
