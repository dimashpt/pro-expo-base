import React, { useImperativeHandle, useState } from 'react';
import { View } from 'react-native';

import { cn, BottomSheet as HNBottomSheet, Surface } from 'heroui-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../app-text';
import { Button, ButtonProps } from '../button';
import { IonIcon } from '../mapped';
import { BottomSheetBlurOverlay } from './bottom-sheet-overlay';

export type BottomSheet = {
  open: () => void;
  close: () => void;
};

export type BottomSheetProps = {
  ref: React.Ref<BottomSheet>;
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  detached?: boolean;
};

export type BottomSheetConfirmationProps = BottomSheetProps & {
  title?: string;
  description?: string;
  variant: 'confirm' | 'warning' | 'danger';
  centered?: boolean;
  onPressCancel?: () => void;
  onPressSubmit?: () => void;
  cancelButtonProps?: Omit<ButtonProps, 'onPress' | 'children'>;
  submitButtonProps?: Omit<ButtonProps, 'onPress' | 'children'>;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
};

export function BottomSheet({
  ref,
  children,
  onOpen,
  onClose,
  detached,
}: BottomSheetProps): React.JSX.Element {
  const [show, setShow] = useState(false);
  const insets = useSafeAreaInsets();

  useImperativeHandle(
    ref,
    () => ({
      open: () => setShow(true),
      close: () => setShow(false),
    }),
    [],
  );

  function toggleForgotPasswordSheet(value: boolean): void {
    if (value) onOpen?.();
    else onClose?.();

    setShow(value);
  }

  return (
    <HNBottomSheet
      isOpen={show}
      onOpenChange={toggleForgotPasswordSheet}
      isDismissKeyboardOnClose
    >
      <HNBottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <HNBottomSheet.Content
          contentContainerClassName={cn(
            'gap-md',
            detached ? 'pb-xl' : 'pb-safe',
          )}
          {...(detached
            ? {
                detached: true,
                bottomInset: insets.bottom,
                className: 'ml-xl mr-xl',
                backgroundClassName: 'rounded-[32px]',
              }
            : {})}
        >
          <HNBottomSheet.Close className="bg-background dark:bg-surface p-sm absolute top-2 right-6 rounded-full" />
          {children}
        </HNBottomSheet.Content>
      </HNBottomSheet.Portal>
    </HNBottomSheet>
  );
}

export function BottomSheetConfirmation({
  ref,
  children,
  title,
  description,
  variant = 'confirm',
  centered,
  onPressCancel,
  onPressSubmit,
  cancelButtonProps,
  submitButtonProps,
  cancelButtonLabel,
  submitButtonLabel,
  ...props
}: BottomSheetConfirmationProps): React.JSX.Element {
  const variantIcon: Record<
    BottomSheetConfirmationProps['variant'],
    React.ComponentProps<typeof IonIcon>['name']
  > = {
    confirm: 'help-circle-outline',
    warning: 'warning-outline',
    danger: 'close-circle-outline',
  };

  const variantIconColor: Record<
    BottomSheetConfirmationProps['variant'],
    string
  > = {
    confirm: 'text-accent',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  const variantBgColor: Record<
    BottomSheetConfirmationProps['variant'],
    string
  > = {
    confirm: 'bg-accent/20',
    warning: 'bg-warning/20',
    danger: 'bg-danger/20',
  };

  return (
    <BottomSheet ref={ref} {...props}>
      <Surface
        className={cn(
          'centered size-16 rounded-full',
          variantBgColor[variant],
          centered && 'self-center',
        )}
      >
        <IonIcon
          name={variantIcon[variant]}
          size={32}
          className={variantIconColor[variant]}
        />
      </Surface>
      {title || description ? (
        <View>
          {title && (
            <AppText
              variant="h5"
              className={cn('mb-xs', centered && 'text-center')}
            >
              {title}
            </AppText>
          )}
          {description && (
            <AppText
              variant="body"
              color="muted"
              className={cn(centered && 'text-center')}
            >
              {description}
            </AppText>
          )}
        </View>
      ) : null}
      {children}
      {onPressCancel || onPressSubmit ? (
        <View className="gap-sm flex-row">
          {onPressCancel && (
            <Button
              variant="tertiary"
              {...cancelButtonProps}
              onPress={() => {
                onPressCancel?.();
                (ref as React.RefObject<BottomSheet>)?.current?.close();
              }}
              className={cn('flex-1', cancelButtonProps?.className)}
              label={cancelButtonLabel ?? 'Cancel'}
            />
          )}
          {onPressSubmit && (
            <Button
              variant="primary"
              {...submitButtonProps}
              onPress={onPressSubmit}
              className={cn('flex-1', submitButtonProps?.className)}
              label={submitButtonLabel ?? 'Submit'}
            />
          )}
        </View>
      ) : null}
    </BottomSheet>
  );
}

BottomSheet.DisplayName = 'BottomSheet';
BottomSheetConfirmation.DisplayName = 'BottomSheetConfirmation';

BottomSheet.Confirm = BottomSheetConfirmation;

export * from './bottom-sheet-overlay';
