<script setup lang="ts">
  const { locale, locales, t } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div
    class="flex items-center gap-1 font-mono text-xs"
    role="group"
    :aria-label="t('langSwitcher.label')"
  >
    <template v-for="(l, i) in locales" :key="l.code">
      <span v-if="i > 0" class="text-border" aria-hidden="true">/</span>
      <NuxtLink
        :to="switchLocalePath(l.code)"
        class="rounded px-1 py-0.5 uppercase transition-colors"
        :class="
          l.code === locale ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        "
        :aria-current="l.code === locale ? 'true' : undefined"
      >
        {{ l.code }}
      </NuxtLink>
    </template>
  </div>
</template>
