import { useCallback, useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { Box, Button, Paper, Theme, useMediaQuery } from '@mui/material';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';
import { ITecnico } from '../../shared/Service/api-TS/models/Tecnico';
import { TecnicoService } from '../../shared/Service/api-TS/tecnicos/TecnicoService';

export const PdfFinalizacaoFinalizado: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>();
  const [dadosTecnico, setDadosTecnico] = useState<ITecnico>();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const { id } = useParams();

  const pegarTecnico = useCallback((id: number) => {
    TecnicoService.getByID(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setDadosTecnico(res);
      })
      .catch();
  }, []);

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        pegarTecnico(res.technician_id);
        setDadosPDF(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <table className="table table-bordered" style={{ tableLayout: 'fixed' }}>
        <tbody>
          <tr className="table-dark">
            <td colSpan={6} className="alignCenter" style={{ color: 'black' }}>
              <strong>FINALIZAÇÃO</strong>
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                wordWrap: 'break-word',
                border: '0px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
              }}
            >
              <strong>Observações gerais</strong>
              <br />
              {dadosPDF?.generalObservations}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                wordWrap: 'break-word',
                border: '0px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
              }}
            >
              <br />
              {(!dadosTecnico?.pathAssinatura?.includes('https')) && (
                'Não possui assinatura'
              )}
              {(dadosTecnico?.pathAssinatura?.includes('https')) && (

                <img
                  src={dadosTecnico.pathAssinatura}
                  style={{ maxHeight: smDown ? '100px' : '300px', maxWidth: smDown ? '100px' : '300px' } }
                  alt="Tecnico"
                />
              )}
              <br />
              <strong>{dadosTecnico?.nome}</strong>
            </td>
            <td
              colSpan={3}
              style={{
                wordWrap: 'break-word',
                border: '0px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
              }}
            >
              <br />
              {!(dadosPDF?.client_signature_url?.includes('https')) && (
                'Não possui assinatura'
              )}
              {(dadosPDF?.client_signature_url?.includes('https')) && (
                <img
                  src={dadosPDF?.client_signature_url}
                  style={{ maxHeight: smDown ? '100px' : '300px', maxWidth: smDown ? '100px' : '300px' } }
                  alt="Responsável"
                />
              )}
              <br />
              <strong>Colaborador responsável</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
