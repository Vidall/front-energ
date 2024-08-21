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

export const PdfImagens: React.FC = () => {
  const [dadosPDF, setDadosPDF] = useState<IPDF>();
  const [dadosCliente, setDadosCliente] = useState<TPessoa | undefined>();
  const [dadosEquipamento, setDadosEquipamento] = useState<IEquipamento | undefined>();
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
          {Object.values(groupedServices).map((group, index) => (
            <React.Fragment key={index}>
              {group.services.map((service, idx) => (            
                <tr>
                  <td className="alignCenter">
                    <img 
                      src={service.urlPhotoBefore}
                      style={{ maxHeight: '300px' }}
                    /><br /><br />
                    <div 
                      style={{
                        fontSize: '11px',
                        fontFamily: 'sans-serif',
                        backgroundColor: '#ebebeb'
                      }}
                    >
                      <strong>{`Foto Antes ${service.service.name}`}</strong>
                    </div>
                  </td>
                  <td className="alignCenter">
                    <img 
                      src={service.urlPhotoAfter} 
                      style={{ maxHeight: '300px' }}
                    /><br /><br />
                    <div 
                      style={{
                        fontSize: '11px',
                        fontFamily: 'sans-serif',
                        backgroundColor: '#ebebeb'
                      }}
                    >
                      <strong>{`Foto Depois ${service.service.name}`}</strong>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>        
      </table>
    </>
  );
};
