import React, { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/createClient'; // Adjust the path if necessary
import './Adm.css'
import img from './img.png'


const Index = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchTotalAmount();
  }, []);

  const fetchTotalAmount = async () => {
    try {
      const { data, error } = await supabase
        .from('aprovados')
        .select('pagamento');
      if (error) {
        throw error;
      }
      const total = data.reduce((sum, record) => {
        const pagamento = parseFloat(record.pagamento);
        return isNaN(pagamento) ? sum : sum + pagamento;
      }, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Erro ao buscar os pagamentos:', error.message);
    }
  };

  return (
    <div className='home'>
      <h1 id='title'>GERENCIE SUA FESTA POR AQUI!</h1>
      <img src={img} alt="" srcset="" />
      <h2>Total Arrecadado Arraial: <span id='valorTotal'>R$ {totalAmount.toFixed(2)}</span></h2>
    </div>
  );
}

export default Index;
