import SignatureCanvas from 'react-signature-canvas';
import { Box, Typography, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ISendAssinaturaCliente } from '../../../Service/api-JAVA/models/OrdemServico';

/*eslint-disable @typescript-eslint/no-explicit-any*/

interface VTextFieldProps {
  name: keyof ISendAssinaturaCliente | 'file';
  control: Control<ISendAssinaturaCliente>;
  errors: FieldErrors<ISendAssinaturaCliente>;
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
export const VAssinaturClienteOS: React.FC<VTextFieldProps> = ({ name, control, rules }) => {
  const theme = useTheme();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const handleEnd = (field: any) => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL();
      const signatureFile = dataURLtoFile(signatureData, 'signature.png');
      field.onChange(signatureFile);
      setSignaturePreview(signatureData);  // Atualize a pré-visualização
      console.log(signatureFile);
    } else {
      console.log('O canvas está vazio.');
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
      <Box mt={2}>
        <Typography textAlign={'left'}>Assine aqui</Typography>
      </Box>
      {signaturePreview && (
        <Box mt={2}>
          <Typography textAlign={'left'}>Pré-visualização da assinatura:</Typography>
          <img src={signaturePreview} alt="Pré-visualização da assinatura" style={{ border: '1px solid black', borderRadius: '4px' }} />
        </Box>
      )}
    </Box>
  );
};
