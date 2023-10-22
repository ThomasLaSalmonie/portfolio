<script setup lang="ts">
</script>

<template>
  <Construction />
</template>

<style scoped>
  .project-container {
    max-width: 900px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
  .block-element {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
  }
</style>
