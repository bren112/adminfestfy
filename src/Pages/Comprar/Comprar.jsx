import React, { useState } from 'react';
import { supabase } from '../../Supabase/createClient';

const Comprar = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [valorPago, setValorPago] = useState('25');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Insira os dados no banco de dados
      const { data, error } = await supabase.from('user_solicitacao').insert([{ nome, telefone, pagamento: valorPago }]);
      if (error) {
        throw error;
      }
      // Limpe os campos após a submissão bem-sucedida
      setNome('');
      setTelefone('');
      setValorPago('25'); // Resetar para 25 após envio
      alert('Dados inseridos com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir os dados:', error.message);
    }
  };

  return (
    <div>
      <h1>Comprar</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="valorPago">Valor Pago:</label>
          <input type="text" id="valorPago" disabled='true' value={valorPago} onChange={(e) => setValorPago(e.target.value)} required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Comprar;
