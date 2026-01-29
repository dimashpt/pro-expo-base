import React from 'react';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Popover, useToast } from 'heroui-native';
import { Resolver, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import z from 'zod';

import { AppText, Button, Header, InputField, IonIcon } from '@/components';
import { delay } from '@/utils/async';

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordScreen(): React.JSX.Element {
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(
      resetPasswordFormSchema,
    ) as Resolver<ResetPasswordFormSchema>,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (_data: ResetPasswordFormSchema) => delay(2000),
    onSuccess: () => {
      toast.show({
        variant: 'success',
        label: 'Password reset successful',
        description: 'Your password has been successfully reset',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
      router.replace('/login');
    },
    onError: () => {
      toast.show({
        variant: 'danger',
        label: 'Reset failed',
        description: 'Failed to reset your password. Please try again.',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  function onSubmitResetPassword(data: ResetPasswordFormSchema): void {
    resetPasswordMutation.mutate(data);
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
            <IonIcon name="key-outline" size={32} className="text-accent" />
          </View>

          <AppText variant="h2" className="text-accent">
            Reset Password
          </AppText>
          <AppText variant="body" color="muted">
            Enter your new password below
          </AppText>
        </View>

        {/* Form Section */}
        <View className="gap-md">
          <Popover>
            <Popover.Trigger asChild>
              {/* Password Input */}
              <InputField
                control={control}
                name="password"
                label="New Password"
                placeholder="Enter your new password"
                secureTextEntry
                prefix={
                  <IonIcon
                    name="lock-closed-outline"
                    size={16}
                    className="text-muted"
                  />
                }
                returnKeyType="next"
              />
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content
                placement="top"
                className="gap-1 rounded-xl px-6 py-4"
              >
                <Popover.Title>Information</Popover.Title>
                <Popover.Description>
                  This popover includes a title and description to provide more
                  structured information to users.
                </Popover.Description>
              </Popover.Content>
            </Popover.Portal>
          </Popover>

          {/* Confirm Password Input */}
          <InputField
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            secureTextEntry
            prefix={
              <IonIcon
                name="lock-closed-outline"
                size={16}
                className="text-muted"
              />
            }
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onSubmitResetPassword)}
          />
        </View>

        <View className="flex-1" />

        {/* Reset Button */}
        <Button
          label="Reset Password"
          variant="primary"
          onPress={handleSubmit(onSubmitResetPassword)}
          loading={resetPasswordMutation.isPending}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
