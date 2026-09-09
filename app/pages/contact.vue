<script setup lang="ts">
  import { socials, CONTACT_EMAIL, LOCATION } from '~/utils/contact';

  const { t } = useI18n();

  useSeoMeta({
    title: () => t('contact.seoTitle'),
    description: () => t('contact.seoDescription')
  });
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1 class="sr-only">{{ t('contact.h1') }}</h1>

    <div class="flex flex-col gap-2">
      <span class="eyebrow">{{ t('contact.email') }}</span>
      <a
        :href="`mailto:${CONTACT_EMAIL}`"
        class="link-accent w-fit font-display text-xl font-bold sm:text-2xl"
      >
        {{ CONTACT_EMAIL }}
      </a>
      <span class="font-mono text-xs text-muted-foreground">{{ LOCATION }}</span>
    </div>

    <ul class="flex flex-col divide-y rounded-lg border">
      <li v-for="social in socials" :key="social.label">
        <a
          :href="social.href"
          target="_blank"
          rel="me noopener"
          class="flex items-center gap-4 p-4 transition-colors hover:bg-accent"
        >
          <Icon :name="social.icon" size="20" class="text-muted-foreground" />
          <span class="text-sm font-medium">{{ social.label }}</span>
          <span class="ml-auto font-mono text-xs text-muted-foreground">{{ social.handle }}</span>
          <Icon name="lucide:arrow-up-right" size="16" class="text-muted-foreground" />
        </a>
      </li>
    </ul>
  </div>
</template>
