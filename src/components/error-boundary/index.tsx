import type { ErrorInfo, ReactNode } from 'react';
import type { ErrorFallbackProps } from './error-fallback';

import React, { Component } from 'react';
import { View } from 'react-native';

import * as Updates from 'expo-updates';

import { Sentry } from '@/lib/sentry';
import { logger } from '@/utils/logger';
import { ErrorFallback } from './error-fallback';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /**
   * Custom fallback component to render when an error occurs
   */
  fallback?: React.ComponentType<ErrorFallbackProps>;
  /**
   * Callback when an error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /**
   * Whether to report errors to Sentry (default: true in production)
   */
  reportToSentry?: boolean;
  /**
   * Whether this is the root error boundary
   * Root boundaries show app-level recovery options (restart app)
   * Non-root boundaries show component-level recovery (retry)
   */
  isRoot?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI.
 *
 * @example
 * ```tsx
 * // Root level usage (in _layout.tsx)
 * <ErrorBoundary isRoot>
 *   <App />
 * </ErrorBoundary>
 *
 * // Component level usage
 * <ErrorBoundary
 *   onError={(error) => console.log('Component error:', error)}
 *   fallback={CustomErrorComponent}
 * >
 *   <RiskyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError, reportToSentry = !__DEV__ } = this.props;

    // Log the error
    logger.error('ErrorBoundary caught an error:', error);
    logger.error('Component stack:', errorInfo.componentStack);

    // Report to Sentry in production
    if (reportToSentry) {
      Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }

    // Call custom error handler if provided
    onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleRestart = async (): Promise<void> => {
    try {
      // Check if we can reload with expo-updates
      if (!__DEV__ && Updates.isEmbeddedLaunch) {
        await Updates.reloadAsync();
      } else {
        // In development, just reset the error boundary
        this.handleReset();
      }
    } catch (e) {
      logger.error('Failed to restart app:', e);
      // Fallback to just resetting the error boundary
      this.handleReset();
    }
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const {
      children,
      fallback: FallbackComponent,
      isRoot = false,
    } = this.props;

    if (hasError && error) {
      const Fallback = FallbackComponent || ErrorFallback;

      return (
        <View className="flex-1">
          <Fallback
            error={error}
            onReset={this.handleReset}
            onRestart={this.handleRestart}
            isRoot={isRoot}
          />
        </View>
      );
    }

    return children;
  }
}

export { ErrorFallback, type ErrorFallbackProps } from './error-fallback';
export { QueryErrorBoundary } from './query-error-boundary';
