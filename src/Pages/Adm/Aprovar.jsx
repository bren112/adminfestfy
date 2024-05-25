import React, { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/createClient';
import './Adm.css'

function Aprovar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from('user_solicitacao').select('*');
    setUsers(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este usuário?');
    if (confirmDelete) {
      await supabase.from('user_solicitacao').delete().eq('id', id);
      fetchUsers(); // Refresh the list after deletion
    }
  };

  const handleApprove = async (id) => {
    const userToApprove = users.find((user) => user.id === id);
    if (userToApprove) {
      try {
        // Insira o usuário na tabela 'aprovados'
        await supabase.from('aprovados').insert([
          {
            id: userToApprove.id,
            nome: userToApprove.nome,
            telefone: userToApprove.telefone,
            pagamento: userToApprove.pagamento
          }
        ]);

        // Remova o usuário da tabela 'user_solicitacao'
        await supabase.from('user_solicitacao').delete().eq('id', id);

        // Atualize a lista de usuários
        fetchUsers();
      } catch (error) {
        console.error('Erro ao aprovar o usuário:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>App</h1>
      <table>
        <thead>
          <tr>
      
            <th>Nome</th>
            <th>Telefone</th>
            <th>Valor Pago</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
           
              <td>{user.nome}</td>
              <td>{user.telefone}</td>
              <td>{user.pagamento}</td>
              <td>
                <div id='bts'>
                <button id='aprovar' onClick={() => handleApprove(user.id)}>Aprovar</button>
                <button id='excluir' onClick={() => handleDelete(user.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Aprovar;
