import React, { useCallback, useRef, useState } from 'react';
import {
  BlurEvent,
  findNodeHandle,
  FocusEvent,
  TextInput,
  View,
} from 'react-native';

import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import {
  cn,
  PressableFeedback,
  TextField,
  TextFieldInputProps,
} from 'heroui-native';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

import { IonIcon } from '../mapped';

interface InputFieldProps<T extends FieldValues> extends TextFieldInputProps {
  label?: string;
  description?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  control?: Control<T>;
  name?: Path<T>;
  rules?: RegisterOptions<T>;
  fromBottomSheet?: boolean;
}

function BaseInputField<T extends FieldValues>({
  label,
  description,
  prefix,
  suffix,
  required,
  error,
  disabled,
  fromBottomSheet,
  ...props
}: InputFieldProps<T>): React.JSX.Element {
  const inputRef = useRef<TextInput>(null);
  const bottomSheetInternal = fromBottomSheet ? useBottomSheetInternal() : null;
  const [secret, setSecret] = useState(props.secureTextEntry);

  const handleOnFocus = useCallback(
    (e: FocusEvent) => {
      if (bottomSheetInternal) {
        bottomSheetInternal.animatedKeyboardState.set((state) => ({
          ...state,
          target: e.nativeEvent.target,
        }));
      }
    },
    [bottomSheetInternal],
  );

  const handleOnBlur = useCallback(
    (e: BlurEvent) => {
      if (bottomSheetInternal) {
        const keyboardState = bottomSheetInternal.animatedKeyboardState.get();
        const currentFocusedInput = findNodeHandle(
          TextInput.State.currentlyFocusedInput() as TextInput | null,
        );
        const shouldRemoveCurrentTarget =
          keyboardState.target === e.nativeEvent.target;
        const shouldIgnoreBlurEvent =
          currentFocusedInput &&
          bottomSheetInternal.textInputNodesRef.current.has(
            currentFocusedInput,
          );

        if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
          bottomSheetInternal.animatedKeyboardState.set((state) => ({
            ...state,
            target: undefined,
          }));
        }
      }
    },
    [bottomSheetInternal],
  );

  return (
    <TextField
      isRequired={required}
      isDisabled={disabled}
      isInvalid={Boolean(error)}
    >
      {label && <TextField.Label>{label}</TextField.Label>}
      <View className="w-full flex-row items-center">
        <TextField.Input
          ref={inputRef}
          {...props}
          onBlur={fromBottomSheet ? handleOnBlur : undefined}
          onFocus={fromBottomSheet ? handleOnFocus : undefined}
          secureTextEntry={secret}
          className={cn(
            'flex-1',
            prefix && 'pl-10',
            suffix && 'pr-10',
            props.className,
          )}
        />
        {prefix && <View className="absolute left-4">{prefix}</View>}
        {suffix ? (
          <View className="absolute right-4">{suffix}</View>
        ) : props.secureTextEntry ? (
          <PressableFeedback
            className="absolute right-4"
            onPress={() => setSecret(!secret)}
          >
            <IonIcon
              name={secret ? 'eye-outline' : 'eye-off-outline'}
              size={16}
              className="text-muted"
              pointerEvents="none"
            />
          </PressableFeedback>
        ) : null}
      </View>
      {description && (
        <TextField.Description>{description}</TextField.Description>
      )}
      {error && <TextField.ErrorMessage>{error}</TextField.ErrorMessage>}
    </TextField>
  );
}

export function InputField<T extends FieldValues>(
  props: InputFieldProps<T>,
): React.JSX.Element {
  const { control, name, rules, ...rest } = props;

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <BaseInputField
            {...rest}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message || rest.error}
          />
        )}
      />
    );
  }

  return <BaseInputField {...rest} />;
}
