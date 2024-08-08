import { TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IEquipamento, IEquipamentoDetalhe } from '../../../Service/api-TS/models/Equipamentos';

/*eslint-disable @typescript-eslint/no-explicit-any*/

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface VTextFieldEquipamentoProps {
  name: NestedKeyOf<IEquipamentoDetalhe>;
  control: Control<IEquipamentoDetalhe>;
  errors: FieldErrors<IEquipamentoDetalhe>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number'
}

const getNestedValue = <T extends object>(obj: T, path: string): any => {
  return path.split('.').reduce((acc, part) => (acc && (acc as any)[part] !== undefined) ? (acc as any)[part] : undefined, obj);
};

/*eslint-disable react/prop-types*/
export const VTextFieldEquipamento: React.FC<VTextFieldEquipamentoProps> = ({ name, control, errors, label, rules, editing = false, type }) => {
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
        />
      )}
    />
  );
};
