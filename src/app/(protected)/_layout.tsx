import { JSX } from 'react';

import { Stack } from 'expo-router';

export default function GuardLayout(): JSX.Element {
  const SCREENS: ScreenMap[] = [];

  return (
    <Stack>
      {SCREENS.map((screen) => (
        <Stack.Screen
          key={screen.path}
          name={screen.path}
          options={{
            headerShown: screen.headerShown,
          }}
        />
      ))}
    </Stack>
  );
}
