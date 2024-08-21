import { useCallback, useEffect, useState } from 'react';
import { PdfCabecalho } from './PdfCabecalho';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

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

/*eslint-disable react/prop-types*/

export const PaginaPDF: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>(); 
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>(); 

  const navigate = useNavigate();

  const { id } = useParams();

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

      <div 
        style={{display: 'flex', justifyContent:'space-between', padding: 1}}
        className="print-button">
        <Button  onClick={handleClickVoltar}>
          Voltar
        </Button>
        <Button onClick={handleClickImprimir} variant='contained'>
          Imprimir
        </Button>
      </div>
    </>
  );
};
