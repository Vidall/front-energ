import { PdfCabecalhoFinalizado } from './PdfCabecalhoFinalizado';
import { useNavigate } from 'react-router';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { Box, Button, Paper } from '@mui/material';
import { PdfEquipamentoFinalizado } from './PdfEquipamentoFinalizado';
import { PdfDemonstrativoMoFinalizado } from './PdfDemonstrativoMoFinalizado';
import { PdfEscopoFinalizado } from './PdfEscopoFinalizado';
import { PdfVerificacoesFinalizado } from './PdfVerificacoesFinalizado';
import { PdfTesteGeradorFinalizado } from './PdfTesteGeradorFinalizado';
import { PdfStatusGeradorFinalizado } from './PdfStatusGeradorFinalizado';
import { PdfFinalizacaoFinalizado } from './PdfFinalizacaoFinalizado';
import { PdfImagensFinalizado } from './PdfImagensFinalizado';

export const PaginaPdfFinalizado: React.FC = () => {

  const navigate = useNavigate();

  const handleClickImprimir = () => {
    window.print();
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <PdfCabecalhoFinalizado/>
      <PdfEquipamentoFinalizado/>
      <PdfDemonstrativoMoFinalizado/>
      <PdfEscopoFinalizado/>
      <PdfVerificacoesFinalizado/>
      <PdfTesteGeradorFinalizado/>
      <PdfStatusGeradorFinalizado/>
      <PdfFinalizacaoFinalizado/>      
      <PdfImagensFinalizado/>
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
