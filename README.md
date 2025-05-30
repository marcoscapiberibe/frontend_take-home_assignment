# 💻 Frontend - Take Home Assignment

Este é o projeto **frontend** desenvolvido em **Next.js + TypeScript + Styled Components** como parte do desafio técnico fullstack. Ele se conecta a uma API backend para gerenciamento de usuários.

## 🧰 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query)
- [Axios](https://axios-http.com/)
- [Styled-components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Phosphor Icons](https://phosphoricons.com/)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd frontend_take-home_assignment
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

⚠️ Esta variável define a **URL base da API do backend**. Se estiver rodando o backend em outra porta ou domínio, atualize conforme necessário.

### 4. Rode o projeto

```bash
npm run dev
# ou
yarn dev
```

O frontend estará disponível em:

```
http://localhost:3000
```

---

## 📁 Estrutura de pastas

```
├── components/       # Componentes reutilizáveis
├── pages/            # Rotas (Next.js)
├── styles/           # Estilos globais e temas
├── types/            # Tipagens globais
├── utils/            # Funções auxiliares
├── services/         # Configuração do axios
├── .env.local        # Variáveis de ambiente (não versionado)
```

---

## ✅ Funcionalidades

- ✅ Listagem de usuários
- ✅ Criação de usuário
- ✅ Edição de usuário
- ✅ Exclusão de usuário
- ✅ Interface responsiva com tema escuro (dark mode)

---

## 🤝 Autor

Desenvolvido por Marcos Capiberibe para o desafio técnico fullstack.

---
