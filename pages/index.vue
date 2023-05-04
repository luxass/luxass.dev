<script setup lang="ts">
const { data: projects } = await useFetch<
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
    <div flex-1 flex flex-col pr-8 min-h-200px>
      <h1 font-bold text-3xl md:text-5xl tracking-tight mb-2>
        Hey I&apos;m luxass <span>✌️</span>
      </h1>
      <p text-gray-200 flex-1>
        I&apos;m a self-taught developer based in Aarhus, Denmark. <br />
        In my spare time I enjoy learning new technologies and working on side
        projects.
      </p>
      <div
        mt-12
        w-30
        font-normal
        text-gray-400
        group
        inline-block
        px-3
        py-2
        rounded-lg
        bg-gray-800
        flex
        justify-between
      >
        <NuxtLink
          href="https://github.com/luxass"
          target="_blank"
          hover-text-white
        >
          <UnoIcon class="i-carbon:logo-github" />
        </NuxtLink>
        <NuxtLink
          href="https://www.linkedin.com/in/lucasnrgaard/"
          target="_blank"
          hover-text-white
        >
          <UnoIcon class="i-carbon:logo-linkedin" />
        </NuxtLink>
        <NuxtLink
          href="mailto:lucasnrgaard@gmail.com"
          target="_blank"
          hover-text-white
        >
          <UnoIcon class="i-carbon:email" />
        </NuxtLink>
      </div>
    </div>
  </section>
  <section mt-8>
    <h2 text-3xl>Some of my projects, I&apos;ve been working on.</h2>
    <div mt-4 grid grid-cols-1 gap-4 auto-cols-max sm:grid-cols-2 sm:gap-3>
      <ProjectCard v-for="project in projects" v-bind:project="project" />
    </div>
  </section>
</template>
