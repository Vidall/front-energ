import { useCallback, useEffect, useState } from 'react';
import { PdfCabecalho } from './PdfCabecalho';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { IPDF } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './PdfCabecalho.css';
import { Box, Button, Paper } from '@mui/material';

export const PaginaPDF: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>(); 
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>(); 

  const navigate = useNavigate();

  const { id } = useParams();

  const dadosClienteAoCarregar = useCallback((id: number) => {

    PessoaFisicaService.getByID(id)
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        console.log(res);
        setDadosCliente(res);
      })
      .catch(error => console.log(error));

  },[]);

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setDadosPDF(res);
        dadosClienteAoCarregar(res.client_id);
      })
      .catch(error => console.log(error));
  },[]);

  const handleClickImprimir = () => {
    window.print();
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ padding: 0 }}>
              <img 
                src="/logoEnerg.png" 
                style={{
                  maxWidth: '205px',
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
              {dadosCliente?.id}
            </td>
            <td>
              <strong> {dadosCliente?.tipo === 'fisico' ? 'CPF' : 'CNPJ'} </strong>
              {dadosCliente?.tipo === 'fisico' ? dadosCliente.cpf : dadosCliente?.cnpj}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}>
              <strong> Cliente: </strong> {dadosCliente?.nome}
            </td>
            <td>
              <strong>Unidade: </strong>
              {dadosCliente?.endereco.cidade}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={2}>
              <strong>Contato: </strong>
              {dadosCliente?.nomeContato}
            </td>
            <td>
              <strong>telefone: </strong>
              {dadosCliente?.telefone}
            </td>
            <td>
              <strong>e-Mail: </strong>
              {dadosCliente?.email}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={4}>
              <strong>Endereço Atendimento: </strong> 
              {dadosCliente?.endereco.rua}, {dadosCliente?.endereco.numero}, {dadosCliente?.endereco.bairro}, {dadosCliente?.endereco.cidade}
            </td>
          </tr>
          <tr style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>
            <td colSpan={3}>
              <strong>Possui Contrato </strong>
              {dadosCliente?.possuiContrato === true ? 'Sim' : 'Não'}
            </td>
            <td>
              <strong>Tipo de Contrato: </strong>
              {dadosCliente?.tipoContrato}
            </td>
          </tr>
        </tbody>
      </table>
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
