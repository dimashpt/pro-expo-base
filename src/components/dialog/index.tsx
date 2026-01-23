import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Dialog as HNDialog } from 'heroui-native';

import { BlurView } from '../mapped';

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

export type DialogProps = {
  ref: React.Ref<DialogHandle>;
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Dialog description
   */
  description?: string;
  /**
   * Dialog content
   */
  children: React.ReactNode;
  /**
   * Callback when dialog closes
   */
  onClose?: () => void;
  /**
   * Callback when dialog opens
   */
  onOpen?: () => void;
};

/**
 * Dialog component - modal overlay for confirmation and actions
 */
export function Dialog({
  ref,
  title,
  description,
  children,
  onOpen,
  onClose,
}: DialogProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [],
  );

  function handleOpenChange(value: boolean): void {
    if (value) onOpen?.();
    else onClose?.();

    setIsOpen(value);
  }

  return (
    <HNDialog isOpen={isOpen} onOpenChange={handleOpenChange}>
      <HNDialog.Portal>
        <HNDialog.Overlay className="bg-transparent">
          <BlurView style={StyleSheet.absoluteFill} />
        </HNDialog.Overlay>
        <HNDialog.Content>
          <HNDialog.Close className="absolute top-4 right-4" />
          {(title || description) && (
            <View className="mb-lg">
              {title && <HNDialog.Title>{title as string}</HNDialog.Title>}
              {description && (
                <HNDialog.Description>
                  {description as string}
                </HNDialog.Description>
              )}
            </View>
          )}
          {children}
        </HNDialog.Content>
      </HNDialog.Portal>
    </HNDialog>
  );
}
