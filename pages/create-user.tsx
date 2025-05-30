import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getAuthHeader } from '../utils/auth';

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

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const FormCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.xxl};
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: -0.5px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
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

const Input = styled.input`
  background-color: ${props => props.theme.colors.inputBg};
  border: 2px solid ${props => props.theme.colors.inputBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  padding: ${props => props.theme.spacing.md};
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

const PasswordStrength = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.xs};
`;

const StrengthBar = styled.div<{ active: boolean; color: string }>`
  flex: 1;
  height: 3px;
  background-color: ${props => props.active ? props.color : props.theme.colors.border};
  border-radius: 2px;
  transition: ${props => props.theme.transition};
`;

const PasswordHint = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.primaryHover : props.theme.colors.surfaceHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.theme.colors.text};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

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
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SuccessMessage = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid ${props => props.theme.colors.success};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.success};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Calcular força da senha
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = ['#ff4444', '#ff9800', '#ffeb3b', '#4caf50'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:3001/api/users', 
        { name, email, password }, 
        { headers: getAuthHeader() }
      );
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Este email já está em uso');
      } else if (err.response?.status === 400) {
        setError('Dados inválidos. Verifique os campos');
      } else {
        setError('Erro ao criar usuário. Tente novamente');
      }
      console.error('Erro ao criar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <FormCard>
          <BackButton onClick={() => router.push('/')}>
            ← Voltar para lista
          </BackButton>
          
          <Title>Criar Novo Usuário</Title>
          <Subtitle>Preencha os dados abaixo para criar uma nova conta</Subtitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              ✓ Usuário criado com sucesso! Redirecionando...
            </SuccessMessage>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome completo"
                disabled={loading || success}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@exemplo.com"
                disabled={loading || success}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                disabled={loading || success}
                required
              />
              {password && (
                <>
                  <PasswordStrength>
                    {[0, 1, 2, 3].map(index => (
                      <StrengthBar
                        key={index}
                        active={index < passwordStrength}
                        color={strengthColors[passwordStrength - 1]}
                      />
                    ))}
                  </PasswordStrength>
                  <PasswordHint>
                    Força da senha: {
                      passwordStrength === 0 ? 'Muito fraca' :
                      passwordStrength === 1 ? 'Fraca' :
                      passwordStrength === 2 ? 'Média' :
                      passwordStrength === 3 ? 'Boa' : 'Forte'
                    }
                  </PasswordHint>
                </>
              )}
            </FormGroup>

            <ButtonGroup>
              <Button 
                type="button" 
                onClick={() => router.push('/')}
                disabled={loading || success}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                primary 
                disabled={loading || success || !name || !email || !password}
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    Criando...
                  </>
                ) : (
                  <>
                    ✨ Criar usuário
                  </>
                )}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Container>
    </ThemeProvider>
  );
}