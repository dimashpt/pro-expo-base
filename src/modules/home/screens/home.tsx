import React, { JSX } from 'react';
import { BackHandler, Text, View } from 'react-native';

import { useFocusEffect } from 'expo-router';

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
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
