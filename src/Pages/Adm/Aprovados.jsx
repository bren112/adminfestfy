import React, { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/createClient';
import './Adm.css';

const Aprovados = () => {
  const [aprovados, setAprovados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAprovados();
  }, []);

  const fetchAprovados = async () => {
    try {
      const { data, error } = await supabase.from('aprovados').select('*');
      if (error) {
        throw error;
      }
      setAprovados(data);
    } catch (error) {
      console.error('Erro ao buscar os aprovados:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await supabase.from('aprovados').delete().eq('id', id);
      fetchAprovados();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEntrouNaFesta = async (id) => {
    try {
      const confirmEntrada = window.confirm('Tem certeza que o convidado entrou na festa?');
      if (confirmEntrada) {
        await supabase.from('aprovados').update({ entrouNaFesta: true }).eq('id', id);
        fetchAprovados();
      }
    } catch (error) {
      console.error('Erro ao atualizar status de entrada:', error.message);
    }
  };

  return (
    <div>
      <h2 id='title'>Aprovados</h2>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={searchTerm}
        onChange={handleSearch}
      />
      <br />
      <br />
      <table responsive>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Valor Pago</th>
            <th>Entrou na Festa</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {aprovados.map((aprovado, index) => {
            const nomeLowerCase = aprovado.nome.toLowerCase();
            const searchTermLowerCase = searchTerm.toLowerCase();
            const highlight = searchTerm && nomeLowerCase.includes(searchTermLowerCase) ? 'yellow' : 'inherit';

            return (
              <tr key={aprovado.id} style={{ backgroundColor: highlight }}>
                <td>{index + 1}</td>
                <td>{aprovado.nome}</td>
                <td>{aprovado.telefone}</td>
                <td>{aprovado.pagamento}</td>
                <td>
                  {!aprovado.entrouNaFesta ? (
                    <button id='entrou' onClick={() => handleEntrouNaFesta(aprovado.id)}>Entrou</button>
                  ) : (
                    <span>Sim</span>
                  )}
                </td>
                <td>
                  <button id='excluir' onClick={() => handleDelete(aprovado.id)}>Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Aprovados;
