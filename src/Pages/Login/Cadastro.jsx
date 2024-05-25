import React, { useState } from 'react';
import { supabase } from '../../Supabase/createClient';

const Cadastro = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Inscrição no Supabase Authentication
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const userId = data.user.id;

    // Inserir dados do usuário na tabela 'perfis'
    const { error: insertError } = await supabase.from('perfis').insert([
      { id: userId, first_name: firstName, last_name: lastName, email: email, senha: senha }
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      alert('Cadastro realizado com sucesso!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setSenha('');
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Primeiro Nome:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Sobrenome:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Cadastro;
