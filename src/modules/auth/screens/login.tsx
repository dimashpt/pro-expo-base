import React, { useRef } from 'react';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { PressableFeedback, useToast } from 'heroui-native';
import { Resolver, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import z from 'zod';

import {
  AppText,
  AuthHeader,
  BottomSheet,
  Button,
  InputField,
  IonIcon,
} from '@/components';
import { useAuthStore } from '@/store';
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

export default function LoginScreen(): React.JSX.Element {
  const forgotPasswordBottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { setStatus, setUser } = useAuthStore();

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

  const loginMutation = useMutation({
    mutationFn: (_data: LoginFormSchema) => delay(3000),
    onSuccess: () => {
      setStatus('loggedIn');
      setUser({
        email: 'dimas@dimas.com',
        name: 'Dimas',
      });
      toast.show({
        variant: 'success',
        label: `Login successful`,
        description: 'You have successfully logged in',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (_data: ForgotPasswordFormSchema) => delay(1000),
    onSuccess: (_, { email }) => {
      forgotPasswordBottomSheetRef.current?.close();

      router.push('/mfa');

      toast.show({
        variant: 'success',
        label: `OTP sent to ${email}`,
        description: 'Check your inbox to verify your identity',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  function onSubmitLogin(data: LoginFormSchema): void {
    loginMutation.mutate(data);
  }

  function onSubmitForgotPassword(data: ForgotPasswordFormSchema): void {
    forgotPasswordMutation.mutate(data);
  }

  return (
    <View className="bg-background flex-1">
      {/* Navigation Header */}
      <AuthHeader showBackButton={false} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 px-xl pb-safe gap-md"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="gap-xs">
          {/* Decorative Icon */}
          <View className="bg-surface mb-xl size-16 items-center justify-center rounded-2xl shadow-sm">
            <IonIcon name="person-outline" size={32} className="text-accent" />
          </View>

          <AppText variant="h2" className="text-accent">
            Welcome Back
          </AppText>
          <AppText variant="body" color="muted">
            Sign in to your account to continue
          </AppText>
        </View>

        {/* Form Section */}
        <View className="gap-md">
          {/* Email Input */}
          <InputField
            control={loginControl}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            prefix={
              <IonIcon name="mail-outline" size={16} className="text-muted" />
            }
          />

          {/* Password Input */}
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
            onSubmitEditing={loginHandleSubmit(onSubmitLogin)}
          />

          {/* Forgot Password Link */}
          <PressableFeedback
            onPress={() => forgotPasswordBottomSheetRef.current?.open()}
            className="items-end"
          >
            <AppText variant="small" color="accent" className="font-semibold">
              Forgot password?
            </AppText>
          </PressableFeedback>
        </View>

        <View className="flex-1" />

        {/* Login Button */}
        <Button
          label="Sign In"
          variant="primary"
          onPress={loginHandleSubmit(onSubmitLogin)}
          loading={loginMutation.isPending}
        />

        {/* Divider */}
        <View className="gap-lg my-md flex-row items-center">
          <View className="bg-divider h-px flex-1" />
          <AppText variant="small" color="muted" className="font-medium">
            or
          </AppText>
          <View className="bg-divider h-px flex-1" />
        </View>

        {/* Sign Up Link */}
        <View className="gap-xs flex-row justify-center">
          <AppText variant="small" color="muted">
            Don't have an account?
          </AppText>
          <PressableFeedback>
            <AppText variant="small" color="accent" className="font-semibold">
              Sign Up
            </AppText>
          </PressableFeedback>
        </View>

        {/* Footer */}
        <View className="gap-lg items-center">
          <AppText variant="tiny" color="muted" className="text-center">
            By signing in, you agree to our{' '}
            <AppText variant="tiny" color="accent" className="font-semibold">
              Terms
            </AppText>{' '}
            and{' '}
            <AppText variant="tiny" color="accent" className="font-semibold">
              Privacy Policy
            </AppText>
          </AppText>
        </View>

        {/* Forgot Password Bottom Sheet */}
        <BottomSheet.Confirm
          ref={forgotPasswordBottomSheetRef}
          title="Reset Your Password"
          description="Enter your email address and we'll send you a link to create a new password."
          variant="warning"
          onClose={forgotPasswordReset}
          submitButtonLabel="Send Reset Link"
          submitButtonProps={{ loading: forgotPasswordMutation.isPending }}
          onPressCancel={() => {}}
          onPressSubmit={forgotPasswordHandleSubmit(onSubmitForgotPassword)}
        >
          <InputField
            control={forgotPasswordControl}
            name="email"
            label="Email Address"
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            variant="secondary"
            fromBottomSheet
            disabled={forgotPasswordMutation.isPending}
            prefix={
              <IonIcon name="mail-outline" size={16} className="text-muted" />
            }
            onSubmitEditing={forgotPasswordHandleSubmit(onSubmitForgotPassword)}
          />
        </BottomSheet.Confirm>
      </KeyboardAwareScrollView>
    </View>
  );
}
