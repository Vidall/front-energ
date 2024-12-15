import { useCallback, useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { Box, Button, Paper } from '@mui/material';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';

export const PdfEscopoFinalizado: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>();
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>();
  const [dadosEquipamento, setDadosEquipamento] = useState<IEquipamento | undefined>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setDadosPDF(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <table className="table table-bordered">
        <tbody>
          <tr className="table-dark">
            <td colSpan={8} className="alignCenter" style={{color: 'black'}}>
              <strong>ESCOPO DOS SERVIÇOS</strong>
            </td>
          </tr>
          <tr>
            <td>
              {dadosPDF?.escopoDosServicos}                                                     
            </td>

          </tr>

        </tbody>
      </table>
    </>
  );
};
