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

export const PdfStatusGeradorFinalizado: React.FC = () => {
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
            <td colSpan={6} className="alignCenter" style={{ color: 'black' }}>
              <strong>STATUS</strong>
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td><strong>Funcionamento</strong></td>
            <td><strong>Status</strong></td>
          </tr>

          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}><strong>Proteções Motor</strong></td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Proteções Motor - Baixa Pressão Óleo</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.motorProtect.motorProtect_baixaPressaOleo : ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Proteções Motor - Alta Temperatura</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.motorProtect.motorProtect_altaTemperatura : ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Proteções Motor - Ruídos ou Vibrações Anormais</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.motorProtect.motorProtect_ruidosOuVibracoesAnormais : ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}><strong>Proteções Gerador</strong></td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Tensão</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.generatorProtect.generatorProtect_tensao: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Frequência</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.generatorProtect.generatorProtect_frequencia: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Nível do Tanque de Diesel (Status)</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.generatorProtect.generatorProtect_nivelTanqueDiesel: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}><strong>Tempo das Operações</strong></td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Falta de Rede (Segundos)</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.operationTime.operationTime_faltaDeRede: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Assumir Carga (Segundos)</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.operationTime.operationTime_assimirCarga: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Retorno de Rede (Segundos)</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.operationTime.operationTime_retornoDeRede: ''}</td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>Resfriamento do Gerador (Segundos)</td>
            <td>{dadosPDF?.generatorStatus ? dadosPDF?.generatorStatus.operationTime.operationTime_resfriamentoGerador: ''}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
