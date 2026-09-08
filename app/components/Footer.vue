<script setup lang="ts">
  import { socials, CONTACT_EMAIL } from '~/utils/contact';

  const year = new Date().getFullYear();
</script>

<template>
  <footer class="mt-24 border-t">
    <div
      class="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-col gap-1">
        <span class="eyebrow">Get in touch</span>
        <a :href="`mailto:${CONTACT_EMAIL}`" class="link-accent text-sm font-medium">
          {{ CONTACT_EMAIL }}
        </a>
      </div>

      <div class="flex items-center gap-1">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="me noopener"
          :aria-label="social.label"
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon :name="social.icon" size="18" />
        </a>
      </div>
    </div>

    <div class="container-page pb-10">
      <p class="font-mono text-xs text-muted-foreground">© {{ year }} Thomas La Salmonie.</p>
    </div>
  </footer>
</template>
