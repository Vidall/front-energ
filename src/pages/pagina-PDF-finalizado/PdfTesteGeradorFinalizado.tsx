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

export const PdfTesteGeradorFinalizado: React.FC = () => {
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
      <table  className="table table-bordered">
        <tbody>
          <tr className="table-dark">
            <td colSpan={6} className="alignCenter" style={{color: 'black'}}>
              <strong>TESTE DE OPERAÇÃO DO GRUPO GERADOR</strong>
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td><strong>Item</strong></td>
            <td><strong>Unid.</strong></td>
            <td><strong>Refer.</strong></td>
            <td><strong>Faixa ideal</strong></td>
            <td>
              <strong>Sem Carga</strong>
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td colSpan={5}><strong>GMG</strong></td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase R</td>
            <td>Volt (V)</td>
            <td>Outros</td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.gmg.gmg_tFaseR : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase S</td>
            <td>Volt (V)</td>
            <td>Outros</td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.gmg.gmg_tFaseS : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase T</td>
            <td>Volt (V)</td>
            <td>Outros</td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.gmg.gmg_tFaseT : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td colSpan={5}><strong>Rede</strong></td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase R</td>
            <td>Volt (V)</td>
            <td></td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.rede.rede_tFaseR : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase S</td>
            <td>Volt (V)</td>
            <td></td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.rede.rede_tFaseS : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão Fase T</td>
            <td>Volt (V)</td>
            <td></td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.rede.rede_tFaseT : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td colSpan={5}><strong>CORRENTE</strong></td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Fase R</td>
            <td>Amp</td>
            <td></td>
            <td>+ ou 30 a 100%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tFaseR: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Fase S</td>
            <td>Amp</td>
            <td></td>
            <td>+ ou 30 a 100%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tFaseS: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Fase T</td>
            <td>Amp</td>
            <td></td>
            <td>+ ou 30 a 100%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tFaseT: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão da Bateria com Carregador Ligado</td>
            <td>Volt (V)</td>
            <td>12Vcc ou 24Vcc</td>
            <td>+110% a 115%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tBateriaCL: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão da Bateria com Carregador Desligado</td>
            <td>Volt (V)</td>
            <td>12Vcc ou 24Vcc</td>
            <td>Acima de 103%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tBateriaCD: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão da Bateria no Instante da Partida</td>
            <td>Volt (V)</td>
            <td>12Vcc ou 24Vcc</td>
            <td>Acima de 75%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tBateriaIP: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Tensão do Alternador de Baterias em Carga</td>
            <td>Volt (V)</td>
            <td>12Vcc ou 24Vcc</td>
            <td>+110% a 119%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_tBateriaEC: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Frequencia</td>
            <td>Hz</td>
            <td>60</td>
            <td>+ ou - 5%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_frequencia: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Potência</td>
            <td>KVA</td>
            <td>330</td>
            <td>0% a 100%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_potencia: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Potência Reativa</td>
            <td>KVAr</td>
            <td>198</td>
            <td>Maximo 60% Carga (Indutivo)</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_potenciaR: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Potência Elétrica</td>
            <td>KW</td>
            <td>264</td>
            <td>30 a 100%</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_potenciaE: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Fator de Potência</td>
            <td>cos</td>
            <td>0,8</td>
            <td>0,8 a 1,0</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_fatorPotencia: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Temperatura</td>
            <td>°C</td>
            <td>70 a 90</td>
            <td>70°C a 85°C</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_temperatura: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Pressão Óleo</td>
            <td>bar</td>
            <td>2 a 8</td>
            <td>2 bar a 8 bar</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_pressaOleo: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Consumo Combustível</td>
            <td>L/H</td>
            <td>66</td>
            <td></td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_consumoCombustivel : ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Temperatura Admissão</td>
            <td>°C</td>
            <td>25</td>
            <td></td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_temperaturaAd: ''}
            </td>
          </tr>
          <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
            <td>Pré Aquecimento</td>
            <td>°C</td>
            <td></td>
            <td>40C° a 55C°</td>
            <td>
              {dadosPDF?.generatorTest ? dadosPDF?.generatorTest.corrente.corrente_preAquecimento: ''}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
