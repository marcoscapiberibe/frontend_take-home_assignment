import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled, { createGlobalStyle, ThemeProvider, keyframes } from 'styled-components';

const theme = {
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    surfaceHover: '#3a3a3a',
    primary: '#ff6b35',
    primaryHover: '#ff5722',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#3a3a3a',
    danger: '#ff4444',
    dangerHover: '#cc0000',
    success: '#4caf50',
    inputBg: '#262626',
    inputBorder: '#3a3a3a',
    inputFocus: '#ff6b35',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
};

// Reset e estilos globais
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }
`;

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const LoginCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Logo = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  background-color: ${props => props.theme.colors.inputBg};
  border: 2px solid ${props => props.theme.colors.inputBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.xxl};
  transition: ${props => props.theme.transition};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.inputFocus};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  margin-top: ${props => props.theme.spacing.md};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    animation: ${pulse} 1.5s infinite;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.theme.colors.text};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: ${props => props.theme.spacing.sm};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 68, 68, 0.1);
  border: 1px solid ${props => props.theme.colors.danger};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.danger};
  font-size: 0.875rem;
  text-align: center;
  margin-top: ${props => props.theme.spacing.md};
  animation: ${fadeIn} 0.3s ease-out;
`;

const RememberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.xs};
`;

const Checkbox = styled.input`
  margin-right: ${props => props.theme.spacing.xs};
`;

const RememberLabel = styled.label`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ForgotLink = styled.a`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  transition: ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: ${props => props.theme.spacing.lg} 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 30px);
    height: 1px;
    background-color: ${props => props.theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/auth/login', { 
        email, 
        password 
      });
      
      // Salvar token - verificar se vem como access_token ou token
      const token = response.data.access_token || response.data.token;
      
      if (!token) {
        throw new Error('Token não recebido do servidor');
      }
      
      // Salvar token com expiração se "Lembrar-me" estiver marcado
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('token', token);
        localStorage.setItem('token', token); // Também salva no localStorage para compatibilidade
      }
      
      router.push('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Email ou senha incorretos');
      } else if (err.response?.status === 404) {
        setError('Usuário não encontrado');
      } else {
        setError('Erro ao fazer login. Tente novamente');
      }
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <LoginCard>
          <LogoContainer>
            <Logo>U</Logo>
          </LogoContainer>
          
          <Title>Bem-vindo de volta</Title>
          <Subtitle>Faça login para continuar</Subtitle>
          
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <InputIcon>📧</InputIcon>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={loading}
                  required
                  autoComplete="email"
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <InputWrapper>
                <InputIcon>🔒</InputIcon>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  autoComplete="current-password"
                />
              </InputWrapper>
            </FormGroup>

            <Button 
              type="submit" 
              disabled={loading || !email || !password}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </Form>

          {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

          <Divider>ou</Divider>
          
          <Footer>
            Novo por aqui? Entre em contato com o administrador
          </Footer>
        </LoginCard>
      </Container>
    </ThemeProvider>
  );
}