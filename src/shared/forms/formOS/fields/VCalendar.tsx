import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSearchParams } from 'react-router-dom';

export const VCalendar = ()  => {
  const [dataInicio, setFDataInicio] = React.useState<Dayjs | null>();
  const [dataFim, setDataFim] = React.useState<Dayjs | null>();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      // Atualiza o parâmetro startDay se dataInicio estiver definida
      if (dataInicio) {
        newParams.set('startDay', dataInicio.format('YYYY-MM-DD'));
      } else {
        newParams.delete('startDay');
      }

      // Atualiza o parâmetro endDay se dataFim estiver definida
      if (dataFim) {
        newParams.set('endDay', dataFim.format('YYYY-MM-DD'));
      } else {
        newParams.delete('endDay');
      }

      return newParams;
    });
  }, [dataInicio, dataFim, setSearchParams]);

  const handleDateInicio = (newValue: Dayjs | null) => {
    setFDataInicio(newValue);
  };

  const handleDateFim = (newValue: Dayjs | null) => {
    setDataFim(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker 
          label="Data Inicial"
          value={dataInicio}
          onChange={handleDateInicio}
          format='DD/MM/YYYY'
        />
        <DatePicker
          label="Data final"
          value={dataFim}
          onChange={handleDateFim}
          format='DD/MM/YYYY'
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
