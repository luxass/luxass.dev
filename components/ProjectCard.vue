<script setup lang="ts">
defineProps<{
  project: {
    name: string;
    description: string;
    url: string;
    language: {
      name: string;
      color: string;
    };
  };
}>();
</script>

<template>
  <NuxtLink :href="project.url" target="_blank" rel="noopener noreferrer">
    <div
      min-h-36
      h-full
      flex="~ col"
      justify-between
      gap-y-2
      border="~ gray-700"
      p-4
      rounded-xl
      text-gray-200
      hover="bg-gray-800"
    >
      <div flex="~ col" gap-y-2>
        <span
          text-xl
          font-medium
          text-ellipsis
          whitespace-nowrap
          overflow-hidden
          >{{ project.name }}</span
        >
        <p text-sm>{{ project.description }}</p>
      </div>
      <div flex items-center gap-x-2 text-sm>
        <template v-if="project.language">
          <span
            underline
            decoration-wavy
            underline-offset-4
            :style="`text-decoration-color: ${project.language.color}`"
          >
            {{ project.language.name }}
          </span>
        </template>
      </div>
    </div>
  </NuxtLink>
</template>
