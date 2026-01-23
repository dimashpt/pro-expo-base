import type { ButtonRootProps } from 'heroui-native';

import React from 'react';

import { Button as HNButton, Spinner, useThemeColor } from 'heroui-native';

export type ButtonProps = ButtonRootProps & {
  /**
   * The button label text content
   */
  label?: string;
  /**
   * Icon or custom content to render before the label
   */
  prefix?: React.ReactNode;
  /**
   * Icon or custom content to render after the label
   */
  suffix?: React.ReactNode;
  /**
   * Loading state - when true, displays spinner and disables the button
   * All children, label, prefix, and suffix are hidden
   * @default false
   */
  loading?: boolean;
};

/**
 * Button component - simplified wrapper for interactive actions
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  prefix,
  suffix,
  loading = false,
  variant = 'primary',
  children,
  ...props
}) => {
  const accent = useThemeColor('accent');
  const danger = useThemeColor('danger');
  const accentForeground = useThemeColor('accent-foreground');
  const defaultForeground = useThemeColor('default-foreground');
  const dangerForeground = useThemeColor('danger-foreground');

  // Determine spinner color based on button variant
  function getSpinnerColor(): string {
    switch (variant) {
      case 'primary':
        return accentForeground;
      case 'secondary':
        return accent;
      case 'danger':
        return dangerForeground;
      case 'danger-soft':
        return danger;
      case 'tertiary':
      case 'ghost':
      default:
        return defaultForeground;
    }
  }

  return (
    <HNButton
      variant={variant}
      isDisabled={loading || props.isDisabled}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" color={getSpinnerColor()} />
      ) : (
        <>
          {prefix}
          {children ?? (label && <HNButton.Label>{label}</HNButton.Label>)}
          {suffix}
        </>
      )}
    </HNButton>
  );
};
