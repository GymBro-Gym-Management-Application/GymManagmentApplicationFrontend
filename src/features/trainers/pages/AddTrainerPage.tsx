import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  Alert, ActivityIndicator, StatusBar, Platform,
} from 'react-native';
import { styled } from 'nativewind';
import { useCreateTrainer } from '../api/trainerQueries';
import { defaultTrainerValues } from '../hooks/useTrainerDefaults';
import { TrainerPayload } from '../types/trainer.types';
import StepIndicator from '../components/StepIndicator';
import StepBasicInfo from '../components/StepBasicInfo';
import StepEmployment from '../components/StepEmployment';
import StepSalary from '../components/StepSalary';
import StepPaymentDetails from '../components/StepPaymentDetails';
import StepAvailability from '../components/StepAvailability';
import StepBookingCommission from '../components/StepBookingCommission';
import StepCertDocuments from '../components/StepCertDocuments';
import StepMiscellaneous from '../components/StepMiscellaneous';

const StyledView      = styled(View);
const StyledText      = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const STEPS = [
  'Basic Info', 'Employment', 'Salary', 'Payment',
  'Availability', 'Booking', 'Certs & Docs', 'Other',
];

export default function AddTrainerPage() {
  const [step, setStep]         = useState(0);
  const [formData, setFormData] = useState<TrainerPayload>({ ...defaultTrainerValues });
  const { mutate, isPending }   = useCreateTrainer();

  const updateForm = (fields: Partial<TrainerPayload>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: (res) => Alert.alert(res.success ? 'Success' : 'Error', res.message ?? 'Something went wrong.'),
      onError:   ()    => Alert.alert('Error', 'Failed to connect to server.'),
    });
  };

  const stepViews = [
    <StepBasicInfo         data={formData} onChange={updateForm} />,
    <StepEmployment        data={formData} onChange={updateForm} />,
    <StepSalary            data={formData} onChange={updateForm} />,
    <StepPaymentDetails    data={formData} onChange={updateForm} />,
    <StepAvailability      data={formData} onChange={updateForm} />,
    <StepBookingCommission data={formData} onChange={updateForm} />,
    <StepCertDocuments     data={formData} onChange={updateForm} />,
    <StepMiscellaneous     data={formData} onChange={updateForm} />,
  ];

  const isLast = step === STEPS.length - 1;

  return (
    <StyledView
      className="flex-1 bg-bg"
      style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />

      {/* Header */}
      <StyledView className="flex-row items-center justify-between px-5 py-4 bg-panel border-b border-line">
        <StyledText className="text-lg font-bold text-white">{STEPS[step]}</StyledText>
        <StyledText className="text-sm text-faint">{step + 1} / {STEPS.length}</StyledText>
      </StyledView>

      {/* Step Indicator */}
      <StepIndicator
        current={step}
        total={STEPS.length}
        labels={STEPS}
        onStepPress={(i) => i < step && setStep(i)}
      />

      {/* Content */}
      <StyledView className="flex-1">{stepViews[step]}</StyledView>

      {/* Footer */}
      <StyledView className="flex-row items-center px-5 py-3 gap-2.5 bg-panel border-t border-line">
        {step > 0 ? (
          <StyledTouchable
            className="py-3 px-5 rounded-xl border border-line bg-input"
            onPress={() => setStep((p) => p - 1)}
            activeOpacity={0.7}
          >
            <StyledText className="text-sm font-semibold text-sub">Back</StyledText>
          </StyledTouchable>
        ) : (
          <StyledView className="w-20" />
        )}

        <StyledTouchable
          className={`flex-1 py-3.5 rounded-xl bg-brand items-center ${isPending ? 'opacity-60' : ''}`}
          onPress={isLast ? handleSubmit : () => setStep((p) => p + 1)}
          disabled={isPending}
          activeOpacity={0.85}
        >
          {isPending
            ? <ActivityIndicator color="#FFFFFF" />
            : <StyledText className="text-white font-bold text-base">
                {isLast ? 'Submit' : 'Continue'}
              </StyledText>
          }
        </StyledTouchable>
      </StyledView>
    </StyledView>
  );
}
