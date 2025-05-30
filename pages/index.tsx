import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getAuthHeader, isAuthenticated } from '../utils/auth';

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

// Componentes estilizados
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  min-height: 100vh;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.5px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.primaryHover : props.theme.colors.surfaceHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${props => props.theme.spacing.md};
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const UserCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.lg};
  transition: ${props => props.theme.transition};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
`;

const UserInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const UserEmail = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CardActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.danger ? props.theme.colors.danger : 'transparent'};
  color: ${props => props.danger ? props.theme.colors.text : props.theme.colors.primary};
  border: 1px solid ${props => props.danger ? props.theme.colors.danger : props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transition};

  &:hover {
    background-color: ${props => props.danger ? props.theme.colors.dangerHover : props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.md};
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 1.125rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: getAuthHeader(),
      });
      return response.data;
    },
  });

  const handleDelete = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${userId}`, {
          headers: getAuthHeader(),
        });
        refetch();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>Gerenciamento de Usuários</Title>
          <ButtonGroup>
            <Button primary onClick={() => router.push('/create-user')}>
              ✨ Criar novo usuário
            </Button>
            <Button onClick={handleLogout}>
              🚪 Sair
            </Button>
          </ButtonGroup>
        </Header>

        {isLoading ? (
          <LoadingState>
            <Spinner />
          </LoadingState>
        ) : users?.length ? (
          <UserGrid>
            {users.map((user: any) => (
              <UserCard key={user.id}>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                <CardActions>
                  <ActionButton onClick={() => router.push(`/edit-user/${user.id}`)}>
                    ✏️ Editar
                  </ActionButton>
                  <ActionButton danger onClick={() => handleDelete(user.id)}>
                    🗑️ Excluir
                  </ActionButton>
                </CardActions>
              </UserCard>
            ))}
          </UserGrid>
        ) : (
          <EmptyState>
            <EmptyStateIcon>👥</EmptyStateIcon>
            <EmptyStateText>Nenhum usuário encontrado</EmptyStateText>
            <Button primary onClick={() => router.push('/create-user')}>
              Criar primeiro usuário
            </Button>
          </EmptyState>
        )}
      </Container>
    </ThemeProvider>
  );
}