import SignatureCanvas from 'react-signature-canvas';
import { Box, Typography, useTheme } from '@mui/material';
import { useRef } from 'react';
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

export const VAssinaturClienteOS: React.FC<VTextFieldProps> = ({ name, control, rules }) => {
  const theme = useTheme();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleEnd = (field: any) => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      // Criar um canvas temporário para adicionar o fundo branco
      const canvas = sigCanvas.current.getCanvas();
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');

      // Definir o tamanho do canvas temporário para o mesmo do original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Adicionar fundo branco ao canvas temporário
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(canvas, 0, 0); // Copiar a assinatura para o canvas temporário

        const signatureData = tempCanvas.toDataURL('image/jpeg'); // Converter para JPEG
        const signatureFile = dataURLtoFile(signatureData, 'signature.jpg'); // Nome do arquivo
        field.onChange(signatureFile);
      }
    } else {
      alert('Assinatura em branco');
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
    </Box>
  );
};
