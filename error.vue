<script setup lang="ts">
import type { NuxtError } from "#app";

// prevent reactive update when clearing error
const { error } = defineProps<{
  error: Partial<NuxtError>;
}>();

if (process.dev) console.error(error);

const handleError = async () => clearError({ redirect: "/" });
</script>

<template>
  <div
    w-full
    h-screen
    flex="~ col"
    items-center
    justify-center
    text="center gray-400"
    bg-gray-900
  >
    <h1 text-4xl mb-4>Something went wrong</h1>
    <div text-2xl>
      {{ error.message || "Unknown Error" }}
    </div>
    <button
      @click="handleError"
      mt-12
      font-normal
      text-gray-400
      px-3
      py-2
      rounded-lg
      bg-gray-800
    >
      Go Back
    </button>
  </div>
  <!-- <div text-secondary>
      {{ message }}
    </div>
    <button
      flex
      items-center
      gap-2
      justify-center
      btn-solid
      text-center
      :disabled="state === 'reloading'"
    >
      <span v-if="state === 'reloading'" block animate-spin preserve-3d>
        <span block i-ri:loader-2-fill />
      </span>
      {{ state === "reloading" ? "Reloading" : "Reload" }}
    </button> -->
</template>
