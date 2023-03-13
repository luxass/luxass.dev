<script setup lang="ts">
import { Project, Projects } from "~~/old/src/types";

// Fetch url
const { projects } = JSON.parse(await $fetch("https://raw.githubusercontent.com/luxass/luxass/main/assets/projects.json"))

console.log(projects);
  
// for (let i = projects.length - 1; i > 0; i--) {
//   const j = Math.floor(Math.random() * (i + 1));
//   [projects[i], projects[j]] = [projects[j], projects[i]];
// }
</script>

<template>
  <!-- {{ projects }} -->
</template>
