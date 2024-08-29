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

export const PdfEquipamento: React.FC = () => {
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
        EquipamentosService.getByIdEquipamento(Number(res.client_equipment_id))
        .then((res) => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }
          setDadosEquipamento(res);
        })
        .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <table className="table table-bordered">
        <tbody>
          <tr className="table-dark">
            <td colSpan={4} className="alignCenter" style={{ color: 'black' }}>
              <strong> DADOS DO EQUIPAMENTO</strong>
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Nr Equipamento:</strong> {dadosEquipamento?.equipamento.numero}
            </td>
            <td>
              <strong>Tipo de Equipamento:</strong> {dadosEquipamento?.equipamento.tipoEquipamento}
            </td>
            <td colSpan={2}>
              <strong>Fabricante:</strong> {dadosEquipamento?.equipamento.fabricante}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Ano de Fabricação:</strong> {dadosEquipamento?.equipamento.anoFabricacao}
            </td>
            <td>
              <strong>Tensão:</strong> {dadosEquipamento?.equipamento.tensao}
            </td>
            <td>
              <strong>Fator de Potência:</strong> {dadosEquipamento?.equipamento.fatorPotencia}
            </td>
            <td>
              <strong>Potência Elétrica:</strong> {dadosEquipamento?.equipamento.potenciaEletrica}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Potência Kva:</strong> {dadosEquipamento?.equipamento.potencia}
            </td>
            <td>
              <strong>Corrente (A):</strong> {dadosEquipamento?.equipamento.corrente}
            </td>
            <td>
              <strong>Frequencia:</strong> {dadosEquipamento?.equipamento.frequencia}
            </td>
            <td>
              <strong></strong> {} {/* onde estava o horimetro antes */}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Motor:</strong> {dadosEquipamento?.equipamento.motor}
            </td>
            <td colSpan={2}>
              <strong>Modelo Motor:</strong> {dadosEquipamento?.equipamento.modeloMotor}
            </td>
            <td>
              <strong>Número Motor:</strong> {dadosEquipamento?.equipamento.numeroMotor}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Alternador:</strong> {dadosEquipamento?.equipamento.alternador}
            </td>
            <td colSpan={2}>
              <strong>Modelo Alternador:</strong> {dadosEquipamento?.equipamento.modeloAlternador}
            </td>
            <td>
              <strong>Número Alternador:</strong> { dadosEquipamento?.equipamento. numeroAlternador}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Usca Modelo:</strong> {dadosEquipamento?.equipamento.uscaModelo}
            </td>
            <td colSpan={2}>
              <strong>Painel de Controle:</strong> {dadosEquipamento?.equipamento.painelControle}
            </td>
            <td>
              <strong>Horímetro:</strong> {dadosEquipamento?.equipamento.horimetro}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
