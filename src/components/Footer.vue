<script setup lang="ts">
  const iconList: { name: string; href: string }[] = [
    {
      name: 'mdi-twitter',
      href: 'https://twitter.com/tlasalmonie'
    },
    {
      name: 'mdi-linkedin',
      href: 'https://www.linkedin.com/in/lasalmoniethomas/'
    },
    {
      name: 'mdi-github',
      href: 'https://github.com/ThomasLaSalmonie'
    }
  ];
</script>

<template>
  <v-footer class="d-flex flex-column" app style="padding: 0px">
    <div class="bg-black d-flex w-100 align-center px-4">
      <strong>Get connected with me on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in iconList"
        :key="icon.name"
        :href="icon.href"
        class="mx-4"
        :icon="icon.name"
        variant="plain"
        size="small"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Thomas La Salmonie</strong>
    </div>
  </v-footer>
</template>
