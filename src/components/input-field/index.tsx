import React, { useState } from 'react';
import { View } from 'react-native';

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
}

function BaseInputField<T extends FieldValues>({
  label,
  description,
  prefix,
  suffix,
  required,
  error,
  disabled,
  ...props
}: InputFieldProps<T>): React.JSX.Element {
  const [secret, setSecret] = useState(props.secureTextEntry);

  return (
    <TextField
      isRequired={required}
      isDisabled={disabled}
      isInvalid={Boolean(error)}
    >
      {label && <TextField.Label>{label}</TextField.Label>}
      <View className="w-full flex-row items-center">
        <TextField.Input
          {...props}
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

export default function InputField<T extends FieldValues>(
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
