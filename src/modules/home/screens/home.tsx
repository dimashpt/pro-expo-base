import React, { JSX } from 'react';
import { BackHandler, View } from 'react-native';

import { useFocusEffect } from 'expo-router';

import { AppText } from '@/components';

export default function HomeScreen(): JSX.Element {
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
    <View className="bg-background pt-safe flex-1 items-center justify-center">
      <AppText variant="h1">h1</AppText>
      <AppText variant="h2">h2</AppText>
      <AppText variant="h3">h3</AppText>
      <AppText variant="h4">h4</AppText>
      <AppText variant="h5">h5</AppText>
      <AppText variant="h6">h6</AppText>
      <AppText variant="subtitle">subtitle</AppText>
      <AppText variant="label">label</AppText>
      <AppText variant="body">body</AppText>
      <AppText variant="small">small</AppText>
      <AppText variant="tiny">tiny</AppText>
    </View>
  );
}
