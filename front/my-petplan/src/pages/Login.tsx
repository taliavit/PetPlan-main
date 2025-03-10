import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        setErrorMessage('E-mail ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
          <InputField
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Entrar</button>

          <p>
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
          <Link to="/">Início</Link>
        </form>
      </div>
    </div>
  );
};

// Componente reutilizável para os campos de entrada
interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required
  />
);

export default Login;
