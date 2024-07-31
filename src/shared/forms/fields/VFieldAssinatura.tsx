import SignatureCanvas from 'react-signature-canvas';
import { Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';

export const VFieldAssinatura: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleEnd = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      setSignature(signatureData);
    }
  };

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} padding={1}>
      <Box justifyContent={'center'}>
        <SignatureCanvas 
          penColor='black' 
          backgroundColor='white'
          ref={sigCanvas}
          onEnd={handleEnd}
          canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
        />
      </Box>
      <Box>
        <Typography textAlign={'left'}>Assine aqui</Typography>
      </Box>
      {signature && (
        <Box>
          <Typography textAlign={'left'}>Assinatura Capturada:</Typography>
          <img src={signature} alt="Assinatura" />
        </Box>
      )}
    </Box>
  );
};