import { JSX } from 'react';

import { Stack } from 'expo-router';

export default function AuthLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
