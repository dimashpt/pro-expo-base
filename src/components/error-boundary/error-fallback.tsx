import React from 'react';
import { View } from 'react-native';

import * as Application from 'expo-application';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';

export interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
  onRestart: () => Promise<void>;
  isRoot?: boolean;
}

/**
 * Default fallback UI component displayed when an error is caught
 * by the ErrorBoundary.
 */
export function ErrorFallback({
  error,
  onReset,
  onRestart,
  isRoot = false,
}: ErrorFallbackProps): React.ReactNode {
  const [isRestarting, setIsRestarting] = React.useState(false);

  const handleRestart = async (): Promise<void> => {
    setIsRestarting(true);
    try {
      await onRestart();
    } finally {
      setIsRestarting(false);
    }
  };

  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <View className="w-full items-center">
        {/* Error Icon */}
        <View className="bg-danger/10 mb-6 size-20 items-center justify-center rounded-full">
          <AppText className="text-4xl">!</AppText>
        </View>

        {/* Title */}
        <AppText variant="h4" className="text-foreground mb-2 text-center">
          {isRoot ? 'Something went wrong' : 'Oops! An error occurred'}
        </AppText>

        {/* Description */}
        <AppText
          variant="body"
          className="text-foreground-500 mb-6 text-center"
        >
          {isRoot
            ? "We're sorry, but something unexpected happened. Please try restarting the app."
            : 'This section encountered a problem. You can try again or go back.'}
        </AppText>

        {/* Error details in development */}
        {__DEV__ && (
          <View className="bg-danger/5 mb-6 w-full rounded-lg p-4">
            <AppText variant="label" className="text-danger mb-2 font-semibold">
              Error Details (Dev Only)
            </AppText>
            <AppText
              variant="small"
              className="text-danger/80 font-mono"
              numberOfLines={5}
            >
              {error.message}
            </AppText>
          </View>
        )}

        {/* Action Buttons */}
        <View className="w-full gap-3">
          {isRoot ? (
            <Button
              loading={isRestarting}
              onPress={handleRestart}
              className="w-full"
              label="Restart App"
            />
          ) : (
            <>
              <Button onPress={onReset} className="w-full" label="Try Again" />
              <Button
                variant="secondary"
                onPress={handleRestart}
                className="w-full"
                label="Restart App"
              />
            </>
          )}
        </View>

        {/* App Version */}
        <AppText variant="tiny" className="text-foreground-400 mt-6">
          Version {Application.nativeApplicationVersion} (
          {Application.nativeBuildVersion})
        </AppText>
      </View>
    </View>
  );
}
