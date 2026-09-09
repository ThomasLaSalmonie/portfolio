<script setup lang="ts">
  const { t } = useI18n();
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === 'dark');

  function toggle() {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  }
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
    @click="toggle"
  >
    <ClientOnly>
      <Icon :name="isDark ? 'lucide:moon' : 'lucide:sun'" size="20" />
      <template #fallback>
        <Icon name="lucide:sun" size="20" />
      </template>
    </ClientOnly>
  </button>
</template>
