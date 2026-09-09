<script setup lang="ts">
  const { t } = useI18n();
  const localePath = useLocalePath();

  useSeoMeta({
    title: () => t('lab.seoTitle'),
    description: () => t('lab.seoDescription')
  });

  const experiments = computed(() => [
    { slug: 'pong', title: t('lab.pongTitle'), description: t('lab.pongDescription') },
    { slug: 'solar-system', title: t('lab.solarTitle'), description: t('lab.solarDescription') },
    { slug: 'driverjs', title: t('lab.driverjsTitle'), description: t('lab.driverjsDescription') }
  ]);
</script>

<template>
  <div class="flex flex-col gap-8">
    <SectionHeading :eyebrow="t('lab.eyebrow')" :title="t('lab.title')" as="h1">
      {{ t('lab.intro') }}
    </SectionHeading>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in experiments" :key="item.slug">
        <NuxtLink
          :to="localePath(`/lab/${item.slug}`)"
          class="group flex h-full flex-col gap-2 rounded-lg border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-[280ms] ease-[var(--ease-standard)] hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-md"
        >
          <span class="font-mono text-xs text-muted-foreground">/{{ item.slug }}</span>
          <h2 class="font-display text-lg font-bold">{{ item.title }}</h2>
          <p class="text-sm text-muted-foreground">{{ item.description }}</p>
          <span class="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-primary">
            {{ t('actions.open') }}
            <Icon
              name="lucide:arrow-up-right"
              size="16"
              class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
