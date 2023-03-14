<script setup lang="ts">
const { data: projects, error } = await useFetch<
  {
    name: string;
    description: string;
    url: string;
    language: {
      name: string;
      color: string;
    };
  }[]
>("/api/projects");
</script>

<template>
  <section flex flex-col-reverse sm:flex-row items-start>
    <div flex-1 flex flex-col pr-8 min-h-[200px]>
      <h1 font-bold text-3xl md:text-5xl tracking-tight mb-2>
        Hey I&apos;m Luxass <span>✌️</span>
      </h1>
      <p text-gray-200 flex-1>
        I&apos;m a self-taught developer based in Grenaa, Denmark. <br />
        Currently in ❤️ with Rust & TypeScript
      </p>
      <NuxtLink
        href="/about"
        mt-12
        w-48
        font-normal
        text-gray-400
        group
        inline-block
        px-3
        py-2
        rounded-lg
        bg-gray-800
      >
        Want to learn more
        <div inline-block group-hover:translate-x-1 transition-transform>→</div>
      </NuxtLink>
    </div>
  </section>
  <section mt-8>
    <h2 text-3xl>Selected projects, you need to see.</h2>
    <div mt-4 grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3>
      <!-- <div v-for="project in projects">
        {{ project }}
      </div> -->
      <ProjectCard v-for="project in projects" v-bind:project="project" />
      <!-- <ProjectCard v-for="project in projects" :project="project" /> -->
    </div>
  </section>
</template>
