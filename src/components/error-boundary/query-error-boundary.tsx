import type { ReactNode } from 'react';

import React from 'react';
import { View } from 'react-native';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Sentry } from '@/lib/sentry';
import { logger } from '@/utils/logger';
import { ErrorBoundary } from './index';

interface QueryErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

/**
 * Fallback component specifically designed for query errors
 * Shows a more contextual message and allows retry
 */
function QueryErrorFallback({
  error,
  onReset,
}: QueryErrorFallbackProps): React.ReactNode {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-full max-w-sm items-center">
        {/* Error Icon */}
        <View className="bg-warning/10 mb-4 size-16 items-center justify-center rounded-full">
          <AppText className="text-3xl">!</AppText>
        </View>

        <AppText variant="h5" className="text-foreground mb-2 text-center">
          Failed to load data
        </AppText>

        <AppText
          variant="body"
          className="text-foreground-500 mb-6 text-center"
        >
          There was a problem loading this content. Please check your connection
          and try again.
        </AppText>

        {/* Error details in development */}
        {__DEV__ && (
          <View className="bg-warning/5 mb-4 w-full rounded-lg p-3">
            <AppText
              variant="small"
              className="text-warning font-mono"
              numberOfLines={3}
            >
              {error.message}
            </AppText>
          </View>
        )}

        <Button onPress={onReset} className="w-full" label="Retry" />
      </View>
    </View>
  );
}

interface QueryErrorBoundaryProps {
  children: ReactNode;
  /**
   * Custom fallback component for query errors
   */
  fallback?: React.ComponentType<QueryErrorFallbackProps>;
  /**
   * Callback when a query error is caught
   */
  onError?: (error: Error) => void;
}

/**
 * Error boundary specifically designed for React Query errors.
 * Integrates with QueryErrorResetBoundary to properly reset queries on retry.
 *
 * @example
 * ```tsx
 * <QueryErrorBoundary>
 *   <ComponentWithQueries />
 * </QueryErrorBoundary>
 * ```
 */
export function QueryErrorBoundary({
  children,
  fallback: FallbackComponent,
  onError,
}: QueryErrorBoundaryProps): React.ReactNode {
  const Fallback = FallbackComponent || QueryErrorFallback;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={(error, errorInfo) => {
            logger.error('QueryErrorBoundary caught an error:', error);

            // Report to Sentry with additional context
            if (!__DEV__) {
              Sentry.captureException(error, {
                tags: {
                  errorType: 'query_error',
                },
                extra: {
                  componentStack: errorInfo.componentStack,
                },
              });
            }

            onError?.(error);
          }}
          fallback={({ error, onReset }) => (
            <Fallback
              error={error}
              onReset={() => {
                reset();
                onReset();
              }}
            />
          )}
          reportToSentry={false} // We handle Sentry reporting above
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
