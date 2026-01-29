import { JSX } from 'react';

import { Stack } from 'expo-router';

export default function GuardLayout(): JSX.Element {
  const SCREENS: ScreenMap[] = [
    {
      path: 'error-boundary-demo',
      headerShown: false,
    },
  ];

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
