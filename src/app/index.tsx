import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  BottomSheet,
  Button,
  PressableFeedback,
  Surface,
  useBottomSheetAnimation,
  useToast,
} from 'heroui-native';
import { Resolver, useForm } from 'react-hook-form';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import z from 'zod';

import { AnimatedBlurView, AppText, IonIcon } from '@/components';
import InputField from '@/components/input-field';
import { delay } from '@/utils/async';
import { emailSchema, stringSchema } from '@/utils/validation';

const loginFormSchema = z.object({
  email: emailSchema,
  password: stringSchema,
});

const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;
type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

export default function Index(): React.JSX.Element {
  const { toast } = useToast();
  const [showForgotPasswordSheet, setShowForgotPasswordSheet] = useState(false);

  const { control: loginControl, handleSubmit: loginHandleSubmit } =
    useForm<LoginFormSchema>({
      resolver: zodResolver(loginFormSchema) as Resolver<LoginFormSchema>,
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'onChange',
    });

  const {
    control: forgotPasswordControl,
    handleSubmit: forgotPasswordHandleSubmit,
    reset: forgotPasswordReset,
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(
      forgotPasswordFormSchema,
    ) as Resolver<ForgotPasswordFormSchema>,
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (_data: ForgotPasswordFormSchema) => delay(3000),
    onSuccess: (_, { email }) => {
      toggleForgotPasswordSheet(false);

      toast.show({
        variant: 'success',
        label: `Email sent to ${email}`,
        description: 'Check your inbox to reset your password',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  function toggleForgotPasswordSheet(value: boolean): void {
    setShowForgotPasswordSheet(value);

    if (!value) forgotPasswordReset();
  }

  function onSubmitLogin(_: LoginFormSchema): void {
    // Do a login mutation
  }

  function onSubmitForgotPassword(data: ForgotPasswordFormSchema): void {
    resetPasswordMutation.mutate(data);
  }

  return (
    <ScrollView
      className="p-safe bg-background"
      contentContainerClassName="p-xl flex-1 justify-end gap-lg"
    >
      <View className="gap-sm w-full">
        <IonIcon name="person-outline" size={48} />
        <AppText variant="h1">Log In</AppText>
        <AppText variant="body" color="muted">
          Enter your details below
        </AppText>
      </View>
      <InputField
        control={loginControl}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        prefix={
          <IonIcon name="mail-outline" size={16} className="text-muted" />
        }
      />
      <InputField
        control={loginControl}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        prefix={
          <IonIcon
            name="lock-closed-outline"
            size={16}
            className="text-muted"
          />
        }
        returnKeyType="done"
      />
      <PressableFeedback onPress={() => setShowForgotPasswordSheet(true)}>
        <AppText
          variant="small"
          color="accent"
          className="text-right font-semibold"
        >
          Forgot password?
        </AppText>
      </PressableFeedback>
      <Button onPress={loginHandleSubmit(onSubmitLogin)}>Login</Button>
      <BottomSheet
        isOpen={showForgotPasswordSheet}
        onOpenChange={toggleForgotPasswordSheet}
        isDismissKeyboardOnClose
      >
        <BottomSheet.Portal>
          <BottomSheetBlurOverlay />
          <BottomSheet.Content contentContainerClassName="pb-safe">
            <Surface className="bg-accent/20 centered mb-md size-16 rounded-full">
              <IonIcon name="help-outline" size={32} className="text-accent" />
            </Surface>
            <View className="gap-sm">
              <AppText variant="h5">Forgot Password?</AppText>
              <AppText variant="body" color="muted">
                Enter your email address and we'll send you a link to reset your
                password.
              </AppText>
              <InputField
                control={forgotPasswordControl}
                name="email"
                placeholder="johndoe@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                variant="secondary"
                disabled={resetPasswordMutation.isPending}
                prefix={
                  <IonIcon
                    name="mail-outline"
                    size={16}
                    className="text-muted"
                  />
                }
              />
              <View className="gap-sm mt-md flex-row">
                <Button
                  variant="tertiary"
                  className="flex-1"
                  onPress={() => setShowForgotPasswordSheet(false)}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={resetPasswordMutation.isPending}
                  className="flex-1"
                  onPress={forgotPasswordHandleSubmit(onSubmitForgotPassword)}
                >
                  Send
                </Button>
              </View>
            </View>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </ScrollView>
  );
}

export function BottomSheetBlurOverlay(): React.JSX.Element {
  const { theme } = useUniwind();
  const { progress } = useBottomSheetAnimation();
  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <BottomSheet.Close style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === 'dark' ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </BottomSheet.Close>
  );
}
