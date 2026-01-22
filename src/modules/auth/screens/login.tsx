import React, { useRef } from 'react';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, PressableFeedback, useToast } from 'heroui-native';
import { Resolver, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import z from 'zod';

import { AppText, BottomSheet, InputField, IonIcon } from '@/components';
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
  const { toast } = useToast();

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

  const forgotPasswordMutation = useMutation({
    mutationFn: (_data: ForgotPasswordFormSchema) => delay(3000),
    onSuccess: (_, { email }) => {
      forgotPasswordBottomSheetRef.current?.close();

      toast.show({
        variant: 'success',
        label: `Email sent to ${email}`,
        description: 'Check your inbox to reset your password',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    },
  });

  function onSubmitLogin(_: LoginFormSchema): void {
    // Do a login mutation
  }

  function onSubmitForgotPassword(data: ForgotPasswordFormSchema): void {
    forgotPasswordMutation.mutate(data);
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      className="bg-background"
      contentContainerClassName="px-xl flex-1 justify-end gap-lg"
    >
      <View className="gap-sm w-full">
        <IonIcon name="person-outline" size={48} className="text-foreground" />
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
      <PressableFeedback
        onPress={() => forgotPasswordBottomSheetRef.current?.open()}
      >
        <AppText
          variant="small"
          color="accent"
          className="text-right font-semibold"
        >
          Forgot password?
        </AppText>
      </PressableFeedback>
      <Button onPress={loginHandleSubmit(onSubmitLogin)}>Login</Button>
      <BottomSheet.Confirm
        ref={forgotPasswordBottomSheetRef}
        title="Forgot Password?"
        description="Enter your email address and we'll send you a link to reset your password."
        variant="warning"
        onClose={forgotPasswordReset}
        submitButtonLabel="Send"
        submitButtonProps={{
          isDisabled: forgotPasswordMutation.isPending,
        }}
        onPressCancel={() => {}}
        onPressSubmit={forgotPasswordHandleSubmit(onSubmitForgotPassword)}
      >
        <View className="gap-sm">
          <InputField
            control={forgotPasswordControl}
            name="email"
            placeholder="johndoe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            variant="secondary"
            fromBottomSheet
            disabled={forgotPasswordMutation.isPending}
            prefix={
              <IonIcon name="mail-outline" size={16} className="text-muted" />
            }
          />
        </View>
      </BottomSheet.Confirm>
    </KeyboardAwareScrollView>
  );
}
