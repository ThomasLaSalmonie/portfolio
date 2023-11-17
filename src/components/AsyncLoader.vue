<script setup lang="ts">
  import type { Nullable } from '~/utils/types/common.types';

  interface BaseAsyncLoaderProps {
    error?: Nullable<Error>;
    isLoading: boolean;
    loadingText?: string;
  }

  withDefaults(defineProps<BaseAsyncLoaderProps>(), { loadingText: 'Loading...' });
</script>

<template>
  <div :class="['async-loader', { isLoading, error }]">
    <template v-if="error">
      <slot name="error">
        {{ error }}
      </slot>
    </template>
    <template v-else-if="!isLoading">
      <slot />
    </template>
    <div v-else class="async-loader__isLoading">Loading</div>
  </div>
</template>

<style lang="scss" scoped>
  .async-loader {
    width: 100%;
    height: 100%;

    &__isLoading,
    &.error {
      width: fit-content;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
  }
</style>
