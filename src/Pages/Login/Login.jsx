import React, { useState } from 'react';
import { supabase } from '../../Supabase/createClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
    alert('Login realizado com sucesso!');
    setEmail('');
    setSenha('');
    setError(null);
  };

  return (
    <form onSubmit={handleSignIn}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
