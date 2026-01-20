import { View } from 'react-native';

import { Checkbox, FormField } from 'heroui-native';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => {
  return (
    <FormField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      className="items-center"
    >
      <FormField.Indicator>
        <Checkbox className="mt-0.5" />
      </FormField.Indicator>
      {title || description ? (
        <View className="flex-1">
          {title && <FormField.Label>{title}</FormField.Label>}
          {description && (
            <FormField.Description>{description}</FormField.Description>
          )}
        </View>
      ) : null}
    </FormField>
  );
};
