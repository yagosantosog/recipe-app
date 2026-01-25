# Recipe App – Plataforma de Descoberta de Receitas

Uma aplicação web moderna e responsiva para descoberta de receitas, construída com **Vue 3**, focada em arquitetura limpa, experiência do usuário e boas práticas de front-end.

A aplicação permite que usuários descubram, pesquisem e explorem receitas por meio de uma interface simples, intuitiva e visualmente estável.

---

## 🚀 Visão Geral

Esta aplicação ajuda os usuários a encontrarem inspiração culinária explorando receitas de uma API pública, oferecendo múltiplas formas de descobrir novos pratos:

- Sugestões de receitas aleatórias
- Busca por nome da receita
- Navegação por categoria

A interface foi projetada para ser **limpa, responsiva e focada no conteúdo**, minimizando ruído visual e evitando mudanças bruscas de layout durante o carregamento.

---

## 🧠 Funcionalidades

- 🍽️ Receita aleatória em destaque na página inicial
- 🔍 Busca de receitas por nome
- 🗂️ Filtro de receitas por categoria
- 📄 Página dedicada de detalhes da receita
- 📺 Link direto para vídeo no YouTube quando disponível
- 🖼️ Lazy loading de imagens com transição suave (fade-in)
- ⚡ Uso de placeholders para evitar layout shift (FOUC)
- 📱 Layout totalmente responsivo
- 🧩 Arquitetura baseada em componentes
- ⚙️ Lógica compartilhada via Vue Composables

---

## 🏗️ Arquitetura & Decisões Técnicas

### Organização de Componentes

A aplicação é estruturada em **componentes pequenos e focados**, cada um responsável por uma única função.

Exemplos:

- `MealCard.vue` cuida da apresentação da receita e da navegação
- `MainLayout.vue` centraliza a estrutura de layout (header, conteúdo e footer)
- Componentes de view (`HomeView`, `SearchRecipesView`, `RecipeDetailsView`) focam apenas na composição das páginas

Essa abordagem melhora a legibilidade, reutilização e manutenção a longo prazo.

---

### Estado & Lógica Compartilhada

A lógica reutilizável relacionada às receitas e à comunicação com a API é centralizada em **composables**, como:

- `useMeals` — responsável por:
  - Buscar receitas aleatórias
  - Realizar buscas por nome
  - Filtrar receitas por categoria
  - Gerenciar estados de loading e erro

Esse padrão mantém os componentes declarativos e evita duplicação de lógica entre as views.

---

## 🎨 Considerações de UX & Performance

Foi tomado cuidado especial para melhorar a performance percebida e a estabilidade visual da aplicação:

- Lazy loading nativo de imagens via HTML
- Transição controlada das imagens após o carregamento
- Fundos placeholder para evitar saltos de layout
- Estratégias de altura mínima para evitar que o footer apareça de forma abrupta durante o carregamento

Essas decisões resultam em uma experiência de uso mais fluida e profissional.

---

## 🧪 Controle de Versão

O projeto segue o padrão **Conventional Commits**, garantindo um histórico de commits limpo e significativo.

Exemplos:

- `feat: add recipe search by category`
- `refactor: move meal fetching logic to composable`
- `perf: improve image loading and visual stability`
- `chore: remove unused styles`

---

## 🛠️ Tecnologias Utilizadas

- **Vue 3** (Composition API)
- **Vite**
- **JavaScript (ES6+)**
- **Vue Router**
- **Scoped CSS**
- **Font Awesome**
- **Git**
