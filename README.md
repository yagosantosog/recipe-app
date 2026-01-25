# Recipe App - Recipe Discovery Platform

A modern and responsive recipe discovery web application built with **Vue 3**, focused on clean architecture, user experience, and front-end best practices.

The application allows users to discover, search, and explore recipes through a simple, intuitive, and visually stable interface.

---

## 🚀 Overview

This application helps users find cooking inspiration by exploring recipes from a public API, offering multiple ways to discover new dishes:

- Random recipe suggestions
- Search by recipe name
- Browse recipes by category

The interface was designed to be **clean, responsive, and content-focused**, minimizing visual noise and avoiding layout shifts during loading.

---

## 🧠 Features

- 🍽️ Random featured recipe on the home page
- 🔍 Search recipes by name
- 🗂️ Filter recipes by category
- 📄 Dedicated recipe details view
- 📺 Direct link to YouTube video when available
- 🖼️ Lazy loading images with smooth fade-in
- ⚡ Placeholder handling to avoid layout shift (FOUC)
- 📱 Fully responsive layout
- 🧩 Component-based architecture
- ⚙️ Shared logic via Vue Composables

---

## 🏗️ Architecture & Technical Decisions

### Component Organization

The application is structured around **small, focused components**, each responsible for a single concern.

Examples:

- `MealCard.vue` handles recipe presentation and navigation
- `MainLayout.vue` centralizes layout structure (header, content, footer)
- View components (`HomeView`, `SearchRecipesView`, `RecipeDetailsView`) focus only on page-level composition

This approach improves readability, reuse, and long-term maintainability.

---

### State & Shared Logic

Reusable logic related to recipes and API interaction is centralized in **composables**, such as:

- `useMeals` — handles:
  - Fetching random recipes
  - Searching by name
  - Filtering by category
  - Loading and error states

This pattern keeps components declarative and avoids duplicated logic across views.

---

## 🎨 UX & Performance Considerations

Special care was taken to improve perceived performance and visual stability:

- Native HTML lazy loading for images
- Controlled image fade-in after load
- Placeholder backgrounds to prevent layout jumps
- Minimum height strategies to avoid footer flashing during loading

These decisions result in a smoother and more professional user experience.

---

## 🧪 Version Control

The project follows **Conventional Commits** to maintain a clean and meaningful Git history.

Examples:

- `feat: add recipe search by category`
- `refactor: move meal fetching logic to composable`
- `perf: improve image loading and visual stability`
- `chore: remove unused styles`

---

## 🛠️ Tech Stack

- **Vue 3** (Composition API)
- **Vite**
- **JavaScript (ES6+)**
- **Vue Router**
- **Scoped CSS**
- **Font Awesome**
- **Git**
