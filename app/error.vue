<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{ error: NuxtError }>();

  const { t } = useI18n();
  const localePath = useLocalePath();

  const isNotFound = computed(() => props.error?.statusCode === 404);
  const title = computed(() =>
    isNotFound.value ? t('error.notFoundTitle') : t('error.genericTitle')
  );

  useSeoMeta({ title: () => title.value, robots: 'noindex' });
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <Header />
    <main class="container-page flex flex-1 items-center py-20">
      <div class="flex flex-col gap-4">
        <span class="eyebrow">{{ t('error.status', { code: error?.statusCode ?? 500 }) }}</span>
        <h1 class="text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-black tracking-tight">
          {{ title }}
        </h1>
        <p v-if="isNotFound" class="prose-measure text-muted-foreground">
          {{ t('error.notFoundBody') }}
        </p>
        <NuxtLink :to="localePath('/')" class="link-accent mt-2 w-fit text-sm font-medium">
          ← {{ t('actions.backHome') }}
        </NuxtLink>
      </div>
    </main>
    <Footer />
  </div>
</template>
