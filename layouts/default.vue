<template>
  <div min-h-screen max-w-3xl mx-auto py-8>
    <main flex-1>
      <slot />
    </main>
    <footer flex items-center justify-center pt-8 pb-4 gap-x-4>
      <NuxtLink href="https://github.com/luxass" target="_blank">
        <UnoIcon class="i-carbon:logo-github"/>
      </NuxtLink>
      <NuxtLink href="https://www.linkedin.com/in/lucasnrgaard/" target="_blank">
        <UnoIcon class="i-carbon:logo-linkedin"/>
      </NuxtLink>
      <NuxtLink href="mailto:lucasnrgaard@gmail.com" target="_blank">
        <UnoIcon class="i-carbon:email"/>
      </NuxtLink>
    </footer>
  </div>
</template>
