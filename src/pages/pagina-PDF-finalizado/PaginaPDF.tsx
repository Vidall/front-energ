import { PdfCabecalho } from './PdfCabecalho';
import { useNavigate } from 'react-router';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { Box, Button, Paper } from '@mui/material';
import { PdfEquipamento } from './PdfEquipamento';
import { PdfDemonstrativoMO } from './PdfDemonstrativoMO';
import { PdfEscopo } from './PdfEscopo';
import { PdfVerificacoes } from './PdfVerificacoes';
import { PdfTesteGerador } from './PdfTesteGerador';
import { PdfStatusGerador } from './PdfStatusGerador';
import { PdfFinalizacao } from './PdfFinalizacao';
import { PdfImagens } from './PdfImagens';

export const PaginaPDF: React.FC = () => {

  const navigate = useNavigate();

  const handleClickImprimir = () => {
    window.print();
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <PdfCabecalho/>
      <PdfEquipamento/>
      <PdfDemonstrativoMO/>
      <PdfEscopo/>
      <PdfVerificacoes/>
      <PdfTesteGerador/>
      <PdfStatusGerador/>
      <PdfFinalizacao/>      
      <PdfImagens/>
      <Box 
        component={Paper} className='print-button'
        style={{display: 'flex', justifyContent:'space-between', padding: 1}}
      >
        <Button  onClick={handleClickVoltar}>
          Voltar
        </Button>
        <Button onClick={handleClickImprimir} variant='contained'>
          Imprimir
        </Button>
      </Box>
    </>
  );
};
