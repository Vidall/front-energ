import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IOs } from '../../../Service/api-JAVA/models/OrdemServico';
import dayjs, { Dayjs } from 'dayjs';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface VTextFieldOsProps {
  name: NestedKeyOf<IOs>;
  control: Control<IOs>;
  errors: FieldErrors<IOs>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number';
}

export const VCalendarAndTime: React.FC<VTextFieldOsProps> = ({ 
  name,
  control,
  errors,
  label,
  rules,
  editing = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          {...field}  
        >
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker label="Data e hora do serviço" value={field.value ? dayjs(field.value as string) : null} onChange={(value: Dayjs | null) => {
              field.onChange(value ? value.format('YYYY-MM-DDTHH:mm') : null);
            }}/>
          </DemoContainer>
        </LocalizationProvider>
      )}
    />
  );
};
