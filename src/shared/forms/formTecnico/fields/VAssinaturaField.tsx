import SignatureCanvas from 'react-signature-canvas';
import { Box, Typography, useTheme } from '@mui/material';
import { useRef } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IUpdateTecnico } from '../../../Service/api-TS/models/Tecnico';

/*eslint-disable @typescript-eslint/no-explicit-any*/

interface VTextFieldProps {
  name: keyof IUpdateTecnico | 'file';
  control: Control<IUpdateTecnico>;
  errors: FieldErrors<IUpdateTecnico>;
  label: string;
  rules?: any; 
  
}

const dataURLtoFile = (dataurl: any, filename: any) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/*eslint-disable react/prop-types*/
export const VAssinaturaField: React.FC<VTextFieldProps> = ({ name, control, rules }) => {
  const theme = useTheme();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleEnd = (field: any) => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      const signatureFile = dataURLtoFile(signatureData, 'signature.png');
      field.onChange(signatureFile);
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      padding={1}
    >
      <Box
        justifyContent={'center'}
        border={1} // Adiciona a borda
        borderColor="black" // Cor da borda
        borderRadius={2}
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <SignatureCanvas
              penColor='black'
              ref={sigCanvas}
              onEnd={() => handleEnd(field)}
              canvasProps={{ width: theme.spacing(36), height: 200, className: 'sigCanvas' }}
            />
          )}
        />
      </Box>
      <Box>
        <Typography textAlign={'left'}>Assine aqui</Typography>
      </Box>
    </Box>
  );
};
