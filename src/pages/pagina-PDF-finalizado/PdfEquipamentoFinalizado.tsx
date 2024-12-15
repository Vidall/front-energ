import { useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { IOsFinalizada, IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';
import { useParams } from 'react-router';
import axios from 'axios';

export const PdfEquipamentoFinalizado: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IOsFinalizada>();
  const [horasFuncionamento, setHorasFuncionamento] = useState<number>();
  const [EnergiaMes, setEnergiaMes] = useState<number>();
  const [alertShown, setAlertShown] = useState(false);

  const { id } = useParams();

  const CalcularHorimetro = (medicaoAtual: number, medicaoAntes: number): number => {
    if (medicaoAtual <= 0) {
      return medicaoAntes;
    }
    if (medicaoAntes <= 0) {
      return medicaoAtual;
    }

    if (medicaoAtual < medicaoAntes) {
      return medicaoAntes;
    }
    return medicaoAtual - medicaoAntes
  }
  const calcularEnergia = (medicaoAtual: number, medicaoAntes: number): number => {
    if (medicaoAtual <= 0) {
      return medicaoAntes;
    }
    if (medicaoAntes <= 0) {
      return medicaoAtual;
    }

    if (medicaoAtual < medicaoAntes) {
      return medicaoAntes;
    }
    return medicaoAtual - medicaoAntes
  }


  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
     .then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return;
        }

         
        axios.get(res.pathPDF)
          .then((res) => {
            if (res instanceof Error) {
              alert('Erro ao consultar Os finalizada');
              return res.message
            }

            setDadosPDF(res.data);
            const data: IOsFinalizada = res.data
            setHorasFuncionamento(CalcularHorimetro(data.client_equipment.horimetro_atual, data.client_equipment.equipamento.horimetro!))
            setEnergiaMes(calcularEnergia(data.client_equipment.KWH_atual, data.client_equipment.equipamento.KWH!))
          })
          .catch((error) => console.log(error))
      })
     .catch((error) => console.log(error));
  }, [])

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
              <strong>Nr Equipamento:</strong> {dadosPDF?.client_equipment.equipamento.numero}
            </td>
            <td>
              <strong>Tipo de Equipamento:</strong> {dadosPDF?.client_equipment?.equipamento.tipoEquipamento}
            </td>
            <td colSpan={1}>
              <strong>Fabricante:</strong> {dadosPDF?.client_equipment?.equipamento.fabricante}
            </td>
            <td>
              <strong>Potência Elétrica:</strong> {dadosPDF?.client_equipment?.equipamento.potenciaEletrica}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Ano de Fabricação:</strong> {dadosPDF?.client_equipment?.equipamento.anoFabricacao}
            </td>
            <td>
              <strong>Tensão:</strong> {dadosPDF?.client_equipment?.equipamento.tensao}
            </td>
            <td>
              <strong>Fator de Potência:</strong> {dadosPDF?.client_equipment?.equipamento.fatorPotencia}
            </td>
            <td>
              <strong>Número Motor:</strong> {dadosPDF?.client_equipment?.equipamento.numeroMotor}
              
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Potência Kva:</strong> {dadosPDF?.client_equipment?.equipamento.potencia}
            </td>
            <td>
              <strong>Corrente (A):</strong> {dadosPDF?.client_equipment?.equipamento.corrente}
            </td>
            <td>
              <strong>Frequencia:</strong> {dadosPDF?.client_equipment?.equipamento.frequencia}
            </td>
            
            <td>
              <strong>Número Alternador:</strong> { dadosPDF?.client_equipment?.equipamento. numeroAlternador} 
              {/* <strong>Potência Elétrica:</strong> {dadosPDF?.client_equipment?.equipamento.potenciaEletrica}            */}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Motor:</strong> {dadosPDF?.client_equipment?.equipamento.motor}
            </td>
            <td >
              <strong>Modelo Motor:</strong> {dadosPDF?.client_equipment?.equipamento.modeloMotor}
            </td>
            <td >
              <strong>Energia anterior:  </strong> {`${dadosPDF?.client_equipment?.equipamento.KWH} KWh`}
            </td>
            <td>
              <strong>Horímetro Anterior: </strong> {`${dadosPDF?.client_equipment?.equipamento.horimetro} H`} 
                       
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Alternador:</strong> {dadosPDF?.client_equipment?.equipamento.alternador}
            </td>
            <td>
              <strong>Modelo Alternador:</strong> {dadosPDF?.client_equipment?.equipamento.modeloAlternador}
            </td>
            <td>
              <strong>Energia atual: </strong> {`${dadosPDF?.client_equipment?.KWH_atual} KWh`}
            </td>
            <td>
              <strong>Horímetro: </strong> {`${dadosPDF?.client_equipment?.horimetro_atual} H`}               
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td>
              <strong>Usca Modelo:</strong> {dadosPDF?.client_equipment?.equipamento.uscaModelo}
            </td>
            <td>
              <strong>Painel de Controle:</strong> {dadosPDF?.client_equipment?.equipamento.painelControle}
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