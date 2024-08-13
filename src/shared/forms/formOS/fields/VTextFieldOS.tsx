import { TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IEquipamento, IEquipamentoDetalhe } from '../../../Service/api-TS/models/Equipamentos';
import { IOs } from '../../../Service/api-JAVA/models/OrdemServico';

/*eslint-disable @typescript-eslint/no-explicit-any*/

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
  type?: 'text' | 'number'
  isMultiline?: boolean 
}

const getNestedValue = <T extends object>(obj: T, path: string): any => {
  return path.split('.').reduce((acc, part) => (acc && (acc as any)[part] !== undefined) ? (acc as any)[part] : undefined, obj);
};

/*eslint-disable react/prop-types*/
export const VTextFieldOS: React.FC<VTextFieldOsProps> = ({ name, control, errors, label, rules, editing = false, type, isMultiline=false }) => {
  const error = getNestedValue(errors, name as string);

  return (
    <Controller
      name={name as any}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          margin="normal"
          size="small"
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ shrink: !!field.value }}
          disabled={editing}
          type={type}
          multiline={isMultiline}
          rows={isMultiline ? 4 : 1}
        />
      )}
    />
  );
};
