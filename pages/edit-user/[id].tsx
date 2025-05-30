import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getAuthHeader } from '../../utils/auth';

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
  margin-bottom: ${props => props.theme.spacing.xl};
  letter-spacing: -0.5px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(26, 26, 26, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius};
`;

const LoadingContainer = styled.div`
  position: relative;
`;

export default function EditUser() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/users/${id}`, {
        headers: getAuthHeader(),
      });
      setUser(response.data);
      setError('');
    } catch (err: any) {
      setError('Erro ao carregar usuário');
      console.error('Erro ao buscar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!user.name.trim() || !user.email.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      setSaving(true);
      await axios.patch(`http://localhost:3001/api/users/${id}`, user, {
        headers: getAuthHeader(),
      });
      router.push('/');
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Este email já está em uso');
      } else {
        setError('Erro ao atualizar usuário');
      }
      console.error('Erro ao atualizar usuário:', err);
    } finally {
      setSaving(false);
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
          
          <Title>Editar Usuário</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <LoadingContainer>
            {loading ? (
              <LoadingOverlay>
                <LoadingSpinner />
              </LoadingOverlay>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Digite o nome"
                    disabled={saving}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Digite o email"
                    disabled={saving}
                    required
                  />
                </FormGroup>

                <ButtonGroup>
                  <Button 
                    type="button" 
                    onClick={() => router.push('/')}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    primary 
                    disabled={saving || !user.name || !user.email}
                  >
                    {saving ? (
                      <>
                        <LoadingSpinner />
                        Salvando...
                      </>
                    ) : (
                      <>
                        ✓ Salvar alterações
                      </>
                    )}
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </LoadingContainer>
        </FormCard>
      </Container>
    </ThemeProvider>
  );
}