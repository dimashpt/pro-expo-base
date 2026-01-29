import React, { JSX } from 'react';
import { BackHandler, View } from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';

import { AppText, Button } from '@/components';

export default function HomeScreen(): JSX.Element {
  const router = useRouter();

  /**
   * Handle back press to exit app, if not handled, the expo router will throw error:
   * `The action 'GO_BACK' was not handled by any navigator.`
   */
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  // TODO: Set user info for Sentry

  function handleBackPress(): boolean {
    BackHandler.exitApp();

    return true;
  }

  return (
    <View className="bg-background pt-safe flex-1 items-center justify-center gap-6 px-6">
      <AppText variant="h4">Home</AppText>

      <Button
        label="Error Boundary Demo"
        onPress={() => router.push('/(protected)/error-boundary-demo')}
        className="w-full"
      />
    </View>
  );
}
