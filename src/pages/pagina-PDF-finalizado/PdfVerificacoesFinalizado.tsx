import React, { useCallback, useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { IPDF, IServiceInOrder } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';

import './BootstrapPDF.css';
import './BootstrapPDF_2.css';
import './LayoutPDF.css';
import { Box, Button, Paper } from '@mui/material';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';

export const PdfVerificacoesFinalizado: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>();
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>();
  const [dadosEquipamento, setDadosEquipamento] = useState<IEquipamento | undefined>();
  const [serviceInOrderMOTOR, setServiceinOrderMOTOR] = useState<IServiceInOrder>();
  const [groupedServices, setGroupedServices] = useState<{ [key: number]: { groupName: string, services: IServiceInOrder[] } }>({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then((res) => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        const serviceInOrder = res.servicesInOrder;
        const grouped = serviceInOrder.reduce((acc: { [key: number]: { groupName: string, services: IServiceInOrder[] } }, curr: IServiceInOrder) => {
          const groupId = curr.service.group.id;
          if (!acc[groupId]) {
            acc[groupId] = {
              groupName: curr.service.group.name,
              services: []
            };
          }
          acc[groupId].services.push(curr);
          return acc;
        }, {});

        setGroupedServices(grouped);
        setDadosPDF(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>

      <table className="table table-bordered">
        <tbody>

          <tr className="table-dark">
            <td colSpan={12} className="alignCenter" style={{ color: 'black'}}>
              <strong>VERIFICAÇÕES</strong>
            </td>
          </tr>

          {Object.values(groupedServices).map((group, index) => (
            <React.Fragment key={index}>
              <tr style={{fontSize: '10px', fontFamily: 'sans-serif', textAlign: 'center'}} >
                <td colSpan={6} style={{border: '0px', textAlign: 'start'}}>
                  <strong>{group.groupName}</strong>
                </td>
                <td colSpan={3} className="alignCenter" style={{border: '0px', marginLeft: '-22px'}}>
                  <strong style={{marginLeft: '-22px', fontSize: '11px'}}>Antes</strong>
                </td>
                <td colSpan={3} className="alignCenter" style={{border: '0px'}}>
                  <strong style={{marginLeft: '-22px', fontSize: '11px'}}>Depois</strong>
                </td>
              </tr>

              {group.services.map((service, idx) => (
                <>
                  <tr style={{fontSize: '10px', fontFamily: 'sans-serif'}}>
                    <td colSpan={6} style={{verticalAlign:  'bottom', fontSize: '11px'}}><i>{service.service.name}</i></td>
                    <td colSpan={3} className="alignCenter"  style={{color: 'black' , fontSize: '15px'}}> {service.verificationBefore}</td>
                    <td colSpan={3} className="alignCenter"  style={{color: 'black' , fontSize: '15px'}}> {service.verificationAfter}</td>
                  </tr>
                </>
              ))}

            </React.Fragment>
          ))}
                                                
        </tbody>
      </table>
    </>
  );
};
