import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  setup(options, nuxt) {
    nuxt.hook("")
    console.log("Nuxt Projects Module")
  },
});
