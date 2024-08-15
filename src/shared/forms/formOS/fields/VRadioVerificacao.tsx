import { Box, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IServiceInOrder } from '../../../Service/api-JAVA/models/OrdemServico';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface VRadioProps {
  name: NestedKeyOf<IServiceInOrder>;
  control: Control<IServiceInOrder>;
  errors: FieldErrors<IServiceInOrder>;
  label: string;
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number';
}

/*eslint-disable react/prop-types*/

export const VRadioVerificacaoServico: React.FC<VRadioProps> = ({ control, name, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <Box display={'flex'} flexDirection={'column'}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            row
            {...field}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel value="OK" control={<Radio />} label="OK" />
            <FormControlLabel value="NOK" control={<Radio />} label="NOK" />
          </RadioGroup>
        </Box>
      )}
    />
  );
};
