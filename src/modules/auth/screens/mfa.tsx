import React from 'react';
import { View } from 'react-native';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { InputOTP, PressableFeedback, useToast } from 'heroui-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { AppText, Button, Header, IonIcon } from '@/components';
import { delay } from '@/utils/async';

interface MFAFormData {
  code: string;
}

export default function MFAScreen(): React.JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const [otpCode, setOtpCode] = React.useState<string>('');

  const mfaMutation = useMutation({
    mutationFn: async (data: MFAFormData) => {
      if (data.code !== '123456') {
        throw new Error('Invalid code');
      }

      await delay(3000);
      return true;
    },
    onSuccess: () => {
      toast.show({
        variant: 'success',
        label: 'Verification successful',
        description: 'You can now reset your password',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
      router.push('/reset-password');
    },
    onError: () => {
      setOtpCode('');
      toast.show({
        variant: 'danger',
        label: 'Invalid code',
        description: 'The code you entered is incorrect. Please try again.',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  function onSubmitMFA(code?: string): void {
    mfaMutation.mutate({ code: code ?? otpCode });
  }

  return (
    <View className="bg-background flex-1">
      {/* Navigation Header */}
      <Header />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 px-xl pb-safe justify-end gap-md"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="gap-xs">
          {/* Decorative Icon */}
          <View className="bg-surface mb-xl size-16 items-center justify-center rounded-2xl shadow-sm">
            <IonIcon
              name="shield-checkmark-outline"
              size={32}
              className="text-accent"
            />
          </View>

          <AppText variant="h2" className="text-accent">
            Verify Your Identity
          </AppText>
          <AppText variant="body" color="muted">
            Enter the 6-digit code sent to your email
          </AppText>
        </View>

        {/* Form Section */}
        <View className="gap-md">
          {/* OTP Input */}
          <View className="gap-sm items-center">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onComplete={onSubmitMFA}
              onChange={setOtpCode}
              isDisabled={mfaMutation.isPending}
            >
              <InputOTP.Group className="flex-1">
                <InputOTP.Slot index={0} className="flex-1" />
                <InputOTP.Slot index={1} className="flex-1" />
                <InputOTP.Slot index={2} className="flex-1" />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group className="flex-1">
                <InputOTP.Slot index={3} className="flex-1" />
                <InputOTP.Slot index={4} className="flex-1" />
                <InputOTP.Slot index={5} className="flex-1" />
              </InputOTP.Group>
            </InputOTP>
          </View>

          {/* Resend Code Link */}
          <View className="gap-xs flex-row justify-center">
            <AppText variant="small" color="muted">
              Didn't receive a code?
            </AppText>
            <PressableFeedback>
              <AppText variant="small" color="accent" className="font-semibold">
                Resend
              </AppText>
            </PressableFeedback>
          </View>
        </View>

        <View className="flex-1" />

        {/* Verify Button */}
        <Button
          label="Verify Code"
          variant="primary"
          onPress={() => onSubmitMFA()}
          loading={mfaMutation.isPending}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
