import type { TextProps as RNTextProps } from 'react-native';

import React from 'react';
import { Text as RNText } from 'react-native';

import { cn } from 'heroui-native';
import { tv } from 'tailwind-variants';

const textVariants = tv({
  base: 'text-foreground',
  variants: {
    variant: {
      h1: 'text-5xl font-bold',
      h2: 'text-4xl font-bold',
      h3: 'text-3xl font-bold',
      h4: 'text-2xl font-bold',
      h5: 'text-xl font-bold',
      h6: 'text-lg font-bold',
      subtitle: 'text-base font-semibold',
      label: 'text-base font-medium',
      body: 'text-base font-normal',
      small: 'text-sm font-normal',
      tiny: 'text-xs font-normal',
    },
    color: {
      foreground: 'text-foreground',
      accent: 'text-accent',
      muted: 'text-muted',
      danger: 'text-danger',
      success: 'text-success',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type AppTextProps = RNTextProps & {
  variant?: keyof (typeof textVariants)['variants']['variant'];
  color?: keyof (typeof textVariants)['variants']['color'];
};

export const AppText = React.forwardRef<RNText, AppTextProps>(
  ({ className, variant, color, ...restProps }, ref) => {
    return (
      <RNText
        ref={ref}
        className={cn(textVariants({ variant, color }), className)}
        {...restProps}
      />
    );
  },
);

AppText.displayName = 'AppText';
