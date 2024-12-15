import {useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useParams } from 'react-router';
import { IOsFinalizada, IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { PessoaJuridicaService } from '../../shared/Service/api-TS/clientes/PessoaJuridicaService';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/system';
import axios from 'axios';

export const PdfCabecalhoFinalizado: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IOsFinalizada>(); 
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>(); 
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        axios.get(res.pathPDF)
        .then((res) => {
          if (res instanceof Error) {
            alert('Erro ao consultar a Os finalizada')
            return res.message;
          }

          setDadosPDF(res.data)

        })
        .catch(error => console.error(error))
      })
      .catch(error => console.log(error));
  },[]);

  return (
    <>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ padding: 0, width: smDown ? '80px' : '205px'}}>
              <img 
                src="/logoEnerg.png" 
                style={{
                  maxWidth: smDown ? '75px' : '205px',
                  marginTop: '5px',
                  maxHeight: '86px',
                  marginBottom: '5px',
                  marginLeft: '5px',
                  marginRight: '-80px'
                }} 
                alt="Logo"
              />
            </th>
            <th 
              className="alignCenter" 
              style={{ verticalAlign: 'middle' }}
            >
              {`ORDEM DE SERVIÇO - MANUTENÇÃO ${dadosPDF?.type}`}
            </th>
            <th 
              className="alignCenter"  
              style={{ verticalAlign: 'middle' }}
            >
              {`OS # ${dadosPDF?.id}`}                                                                                               
            </th>
          </tr>
        </tbody>
      </table>

      <table 
        className="table table-bordered"
        style={{ tableLayout: 'fixed', width: '100%' }}
      >
        <tbody>
          <tr className="table-dark">
            <td colSpan={4} className="alignCenter" style={{ color: 'black' }}>
              <strong>DADOS DO CLIENTE</strong>
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={2}>
              <strong> Nr Ordem de Serviço: </strong>
              {dadosPDF?.id}
            </td>
            <td>
              <strong> Código Cliente: </strong>
              {dadosPDF?.client?.id}
            </td>
            <td>
              <strong> {dadosPDF?.client?.tipo === 'fisico' ? 'CPF' : 'CNPJ'} </strong>
              {dadosPDF?.client?.tipo === 'fisico' ? dadosPDF?.client.cpf : dadosPDF?.client?.cnpj}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}>
              <strong> Cliente: </strong> {dadosPDF?.client?.nome}
            </td>
            <td>
              <strong>Unidade: </strong>
              {dadosPDF?.client?.endereco.cidade}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={2}>
              <strong>Contato: </strong>
              {dadosPDF?.client?.nomeContato}
            </td>
            <td>
              <strong>telefone: </strong>
              {dadosPDF?.client?.telefone}
            </td>
            <td>
              <strong>e-Mail: </strong>
              {dadosPDF?.client?.email}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={4}>
              <strong>Endereço Atendimento: </strong> 
              {dadosPDF?.endereco.rua}, {dadosPDF?.endereco.numero}, {dadosPDF?.endereco.bairro}, {dadosPDF?.endereco.cidade}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}>
              <strong>Possui Contrato </strong>
              {Number(dadosPDF?.client?.possuiContrato) === 1 ? 'Sim' : 'Não'}
            </td>
            <td>
              <strong>Tipo de Contrato: </strong>
              {dadosPDF?.client?.tipoContrato}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
