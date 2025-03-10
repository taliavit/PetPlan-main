import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Cadastro.css'; // Importando o CSS para estilização

const Cadastro: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  // Validação de e-mail
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Verifica se o formulário está válido
  const checkFormValidity = () => {
    setFormValid(name.trim() !== '' && validateEmail(email) && password.length >= 6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValid) {
      setError('Preencha todos os campos corretamente.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: name, email, senha: password }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const errorMsg = await response.text();
        setError(`Erro ao cadastrar usuário: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setError('Erro ao cadastrar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            checkFormValidity();
          }}
          aria-label="Nome"
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            checkFormValidity();
          }}
          aria-label="Email"
        />
        {!validateEmail(email) && email !== '' && <p className="error-text">Email inválido.</p>}

        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkFormValidity();
          }}
          aria-label="Senha"
        />
        {password.length > 0 && password.length < 6 && (
          <p className="error-text">A senha deve ter no mínimo 6 caracteres.</p>
        )}

        <button type="submit" disabled={!formValid || loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
