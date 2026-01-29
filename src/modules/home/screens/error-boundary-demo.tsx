import React, { JSX, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  AppText,
  Button,
  ErrorBoundary,
  Header,
  HeaderRef,
} from '@/components';

// Component that throws an error when triggered
function BuggyComponent({
  shouldThrow,
}: {
  shouldThrow: boolean;
}): JSX.Element {
  if (shouldThrow) {
    throw new Error('This is a simulated render error from BuggyComponent!');
  }
  return (
    <View className="bg-success/10 rounded-lg p-4">
      <AppText variant="body" className="text-success">
        Component is working fine
      </AppText>
    </View>
  );
}

// Component wrapped in its own error boundary
function IsolatedBuggySection(): JSX.Element {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <View className="w-full gap-3">
      <AppText variant="label" className="text-foreground">
        Isolated Error Boundary Demo
      </AppText>
      <AppText variant="small" className="text-foreground-500">
        This section has its own error boundary, so errors here won&apos;t crash
        the whole screen.
      </AppText>
      <ErrorBoundary
        onError={(error) => {
          // eslint-disable-next-line no-console
          console.log('Isolated section caught error:', error.message);
        }}
      >
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
      <Button
        variant="danger"
        label="Trigger Isolated Error"
        onPress={() => setShouldThrow(true)}
      />
    </View>
  );
}

export default function ErrorBoundaryDemoScreen(): JSX.Element {
  const headerRef = useRef<HeaderRef>(null);
  const [shouldThrowGlobal, setShouldThrowGlobal] = useState(false);

  // This will trigger the root error boundary
  if (shouldThrowGlobal) {
    throw new Error(
      'This is a simulated GLOBAL error that crashes the entire app!',
    );
  }

  return (
    <View className="bg-background flex-1">
      {/* Header - Fixed at top with animation */}
      <Header ref={headerRef} title="Error Boundary Demo" animated />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10 gap-6 pt-4"
        onScroll={headerRef.current?.onScroll}
        scrollEventThrottle={16}
      >
        {/* Global Error Demo */}
        <View className="bg-danger/5 mx-4 gap-3 rounded-xl p-4">
          <AppText variant="label" className="text-danger">
            Global Error (Root Boundary)
          </AppText>
          <AppText variant="small" className="text-foreground-500">
            This will crash the entire app and show the root error boundary with
            &quot;Restart App&quot; option.
          </AppText>
          <Button
            variant="danger"
            label="Crash Entire App"
            onPress={() => setShouldThrowGlobal(true)}
          />
        </View>

        {/* Isolated Error Demo */}
        <View className="bg-warning/5 mx-4 gap-3 rounded-xl p-4">
          <IsolatedBuggySection />
        </View>

        {/* Async Error Demo */}
        <View className="bg-accent/5 mx-4 gap-3 rounded-xl p-4">
          <AppText variant="label" className="text-accent">
            Async Error (Unhandled)
          </AppText>
          <AppText variant="small" className="text-foreground-500">
            Async errors are not caught by error boundaries. They need to be
            handled with try/catch or React Query&apos;s error handling.
          </AppText>
          <Button
            variant="secondary"
            label="Trigger Async Error"
            onPress={() => {
              // This won't be caught by error boundary
              setTimeout(() => {
                throw new Error('Async error - check console!');
              }, 100);
            }}
          />
        </View>

        {/* Promise Rejection Demo */}
        <View className="bg-default/10 mx-4 gap-3 rounded-xl p-4">
          <AppText variant="label" className="text-foreground">
            Promise Rejection
          </AppText>
          <AppText variant="small" className="text-foreground-500">
            Unhandled promise rejections are logged but not caught by error
            boundaries.
          </AppText>
          <Button
            variant="tertiary"
            label="Trigger Promise Rejection"
            onPress={async () => {
              // This simulates an unhandled promise rejection
              await Promise.reject(new Error('Unhandled promise rejection!'));
            }}
          />
        </View>

        {/* Typography Demo */}
        <View className="bg-default/5 mx-4 gap-2 rounded-xl p-4">
          <AppText variant="label" className="text-foreground mb-2">
            Typography Scale
          </AppText>
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
      </ScrollView>
    </View>
  );
}
