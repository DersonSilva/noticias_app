# Notícias App 🚀

Aplicativo mobile desenvolvido em **React Native** com **Expo**, que consome a **GNews API** para exibir notícias em tempo real. Este projeto é um teste técnico, demonstrando habilidades em **TypeScript, APIs, navegação e arquitetura mobile**.

---

## Tecnologias utilizadas

- **React Native** – Desenvolvimento mobile multiplataforma
- **Expo** – Facilita build e deploy do app
- **TypeScript** – Tipagem estática para maior segurança
- **NativeWind / Tailwind CSS** – Estilização rápida e responsiva
- **React Navigation / Expo Router** – Navegação entre telas
- **GNews API** – Fonte de notícias em tempo real
- **React Native Reanimated** – Animações suaves
- **Safe Area Context** – Suporte a áreas seguras de dispositivos

---

## Funcionalidades

- Exibição de notícias em lista com **FlatList**
- Barra de busca para filtrar notícias
- Loading e tratamento de erros
- Detalhes da notícia ao clicar
- Arquitetura baseada em **Context API** para gerenciamento de estado

---

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/DersonSilva/noticias_app.git
cd noticias_app
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure a API Key da GNews: Crie um arquivo `.env` na raiz do projeto:

```
GNEWS_API_KEY=your_api_key
GNEWS_BASE_URL=https://gnews.io/api/v4
```

4. Rode o projeto:

```bash
npx expo start
```

---

## Como instalar o APK (Android)

1. Baixe o arquivo `NoticiasApp.apk` enviado.
2. Habilite a opção **Instalar de fontes desconhecidas** no dispositivo: Configurações → Segurança → Permitir instalação de fontes desconhecidas.
3. Abra o APK e siga as instruções de instalação.
4. Abra o app e teste todas as funcionalidades.

> Recomendado Android 10+ para melhor desempenho.

---

## Desafio Front-end: App de Notícias em React

**Objetivo:** Desenvolver um aplicativo mobile em React que consome uma API de notícias e exibe as manchetes em uma lista, com funcionalidades básicas de busca e detalhamento. Opcionalmente, criar um build nativo React Native/Expo.

### Requisitos Técnicos

**Tecnologias:**

- React
- Gerenciamento de estado
- Fetch API

**API Sugerida:**

- NewsAPI (requer cadastro para obter uma chave gratuita)
- Alternativa: GNews (também requer chave)

### Sugestão de funcionalidades

#### Tela Inicial (Lista de Notícias)

- Exibir uma lista de notícias com:

  - Imagem de destaque (se disponível)
  - Título
  - Fonte (nome do site/jornal)
  - Data de publicação

- Scroll infinito ou paginação básica

#### Busca por Notícias

- Campo de busca para filtrar notícias por palavra-chave

#### Tela de Detalhes

- Ao clicar em uma notícia, exibir:

  - Título completo
  - Imagem em destaque
  - Conteúdo/resumo
  - Link para a notícia original (clicável)

#### Funcionalidades diferenciais

- Favoritos: salvar notícias localmente
- Categorias: filtrar notícias por categoria (tecnologia, negócios, esportes)
- Modo Offline: exibir notícias já carregadas quando o app estiver sem conexão
