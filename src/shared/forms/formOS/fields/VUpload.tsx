import { Button, Icon, styled } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { ISendImage } from '../../../Service/api-JAVA/models/OrdemServico';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

interface IUploadProps {
  name: NestedKeyOf<ISendImage>;
  control: Control<ISendImage>;
  errors: FieldErrors<ISendImage>;
  label: 'Foto Antes' | 'Foto Depois';
  rules?: any;
  editing?: boolean;
  type?: 'text' | 'number';
  isMultiline?: boolean;
}

/*eslint-disable react/prop-types*/
export const VUpload: React.FC<IUploadProps> = ({
  label,
  name,
  control,
  errors,
  rules
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // Armazena o nome do arquivo no estado
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Button
          component="label"
          variant="contained"
          startIcon={<Icon>cloud_upload</Icon>}
        >
          {fileName ? `${label}: ${fileName}` : label}
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              handleChange(e);
              field.onChange(e);
            }}
          />
        </Button>
      )}
    />
  );
};
