import React from 'react';
import { ScrollView } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'heroui-native';
import { Resolver, useForm } from 'react-hook-form';
import z from 'zod';

import { AppText, IonIcon } from '@/components';
import InputField from '@/components/input-field';
import { emailSchema, stringSchema } from '@/utils/validation';

const loginFormSchema = z.object({
  email: emailSchema,
  password: stringSchema,
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Index(): React.JSX.Element {
  const { control, handleSubmit } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema) as Resolver<LoginFormSchema>,
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: LoginFormSchema): void {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerClassName="p-xl flex-1 justify-end gap-sm"
      className="p-safe bg-background"
    >
      <AppText variant="h1">Welcome back</AppText>
      <AppText variant="body" color="muted">
        Please enter your credentials to continue exploring the app.
      </AppText>
      <InputField
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        prefix={<IonIcon name="mail-outline" size={16} />}
      />
      <InputField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        prefix={<IonIcon name="lock-closed-outline" size={16} />}
        returnKeyType="done"
      />
      <Button onPress={handleSubmit(onSubmit)}>Login</Button>
    </ScrollView>
  );
}
