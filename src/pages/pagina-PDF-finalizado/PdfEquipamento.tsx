import { useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';
import { useParams } from 'react-router';

export const PdfEquipamento: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>();
  const [dadosEquipamento, setDadosEquipamento] = useState<IEquipamento | undefined>();
  const [horasFuncionamento, setHorasFuncionamento] = useState<number>();
  const [EnergiaMes, setEnergiaMes] = useState<number>();
  const [alertShown, setAlertShown] = useState(false);

  const CalcularHoraFuncionamento = (medicaoAtual: number | undefined, medicaoAnterior: number): number | undefined => { 
    if (!alertShown && dadosPDF?.status !== 'FINALIZADO') {
      if (!medicaoAtual || medicaoAtual === 0) {
        alert('Não possui medição atual do horimetro');
        setAlertShown(true);  // Atualiza o estado para evitar mais alertas
        return medicaoAnterior??0; // Atualiza
      }
      if (!medicaoAnterior) {
        alert('Não possui medição antiga do horimetro');
        setAlertShown(true);
        return medicaoAtual;
      }
      if (medicaoAtual! <= 0) {
        alert('A medição atual do horímetro deve ser maior que 0');
        setAlertShown(true);
        return;
      }
      if (medicaoAtual! < medicaoAnterior) {
        alert('A medição atual do horímetro deve ser maior que a medição anterior');
        setAlertShown(true);
        return;
      }
      return +(medicaoAtual! - medicaoAnterior).toFixed(2);
    }
  };
  const CalcularKWHFuncionamento = (medicaoAtual: number | undefined, medicaoAnterior: number): number | undefined => { 
    if (!alertShown && dadosPDF?.status !== 'FINALIZADO') {
      if (!medicaoAtual || medicaoAtual === 0) {
        alert('Não possui medição atual da Energia KWh');
        setAlertShown(true);  // Atualiza o estado para evitar mais alertas
        return medicaoAnterior??0;
      }
      if (!medicaoAnterior) {
        alert('Não possui medição antiga da Energia KWh');
        setAlertShown(true);
        return medicaoAtual??0;
      }
      if (medicaoAtual! <= 0) {
        alert('A medição atual da Energia KWh deve ser maior que 0');
        setAlertShown(true);
        return;
      }
      if (medicaoAtual! < medicaoAnterior) {
        alert('A medição atual da Energia KWh deve ser maior que a medição anterior');
        setAlertShown(true);
        return;
      }
      return +(medicaoAtual! - medicaoAnterior).toFixed(2);
    }
  };

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
            setHorasFuncionamento(CalcularHoraFuncionamento(
              res.horimetro_atual,
              res.equipamento.horimetro??0
            ));
            setEnergiaMes(CalcularKWHFuncionamento(
              res.KWH_atual,
              res.equipamento.KWH??0
            ));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setAlertShown(false);
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
            <td colSpan={1}>
              <strong>Fabricante:</strong> {dadosEquipamento?.equipamento.fabricante}
            </td>
            <td>
              <strong>Potência Elétrica:</strong> {dadosEquipamento?.equipamento.potenciaEletrica}
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
              <strong>Número Motor:</strong> {dadosEquipamento?.equipamento.numeroMotor}
              
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
              <strong>Número Alternador:</strong> { dadosEquipamento?.equipamento. numeroAlternador} 
              {/* <strong>Potência Elétrica:</strong> {dadosEquipamento?.equipamento.potenciaEletrica}            */}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Motor:</strong> {dadosEquipamento?.equipamento.motor}
            </td>
            <td >
              <strong>Modelo Motor:</strong> {dadosEquipamento?.equipamento.modeloMotor}
            </td>
            <td >
              <strong>Energia anterior:  </strong> {`${dadosEquipamento?.equipamento.KWH} KWh`}
            </td>
            <td>
              <strong>Horímetro Anterior: </strong> {`${dadosEquipamento?.equipamento.horimetro} H`} 
                       
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Alternador:</strong> {dadosEquipamento?.equipamento.alternador}
            </td>
            <td>
              <strong>Modelo Alternador:</strong> {dadosEquipamento?.equipamento.modeloAlternador}
            </td>
            <td>
              <strong>Energia atual: </strong> {`${dadosEquipamento?.KWH_atual} KWh`}
            </td>
            <td>
              <strong>Horímetro: </strong> {`${dadosEquipamento?.horimetro_atual} H`}               
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Usca Modelo:</strong> {dadosEquipamento?.equipamento.uscaModelo}
            </td>
            <td>
              <strong>Painel de Controle:</strong> {dadosEquipamento?.equipamento.painelControle}
            </td>
            <td>
              <strong>Energia no mês: </strong> {`${EnergiaMes??0} KWh`}
            </td>
            <td>
              <strong>Horas de trabalho no mês: </strong> {`${horasFuncionamento??0} H`}     
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};