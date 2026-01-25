<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <header>
    <nav class="header__container container" aria-label="Main navigation">
      <RouterLink to="/" class="logo" aria-label="Go to home page">
        <img src="../../assets/logo.webp" alt="logo" />
      </RouterLink>
    </nav>
  </header>
  <main class="wrapper"><slot /></main>
  <footer>
    <small>Created by</small>
    <a
      href="https://github.com/yagosantosog/recipe-app"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Github link for this project"
    >
      <img
        src="https://avatars.githubusercontent.com/u/94266179?v=4&size=64"
        alt="Profile picture of yagosantosog"
      />
      <span>yagosantosog</span>
      <i class="fa-brands fa-github" aria-hidden="true"></i>
    </a>
  </footer>
</template>
<style scoped>
.wrapper {
  min-height: 100dvh;
}

.header__container img {
  width: 150px;
  max-width: 100%;
}

footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 2rem 0 3rem 0;
}
footer a {
  display: flex;
  align-items: center;
  color: hsl(var(--main-clr));
  gap: 0.5rem;
  padding: 0.3rem;
  padding-right: 0.5rem;
  background-color: hsl(var(--main-clr) / 0.1);
  border-radius: 4rem;
  border: 1px solid transparent;
  transition-duration: 200ms;
  text-decoration: none;
}
footer a:hover {
  border-color: hsl(var(--main-clr) / 0.3);
  background-color: hsl(var(--main-clr) / 0.15);
}
footer a img {
  max-width: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
}

footer p {
  margin: 0;
}
</style>
