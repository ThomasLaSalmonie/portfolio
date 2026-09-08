<script setup lang="ts">
  const experiments = [
    {
      slug: 'pong',
      title: 'Pong Wars',
      description: 'Day-vs-night canvas simulation (after Koen van Gilst).'
    },
    {
      slug: 'solar-system',
      title: 'Solar System',
      description: 'CSS-driven orbiting planets.'
    },
    {
      slug: 'driverjs',
      title: 'Driver.js Tour',
      description: 'Guided product-tour demo built with driver.js.'
    }
  ];
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>Lab - Thomas La Salmonie</Title>
      <Meta name="description" content="Small front-end experiments and demos" />
    </Head>
  </Html>
  <h1 class="text-center">Lab</h1>
  <v-container class="lab-container">
    <v-row>
      <v-col v-for="item in experiments" :key="item.slug" cols="12" sm="6" md="4">
        <v-card :to="`/lab/${item.slug}`" :title="item.title" :text="item.description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .lab-container {
    max-width: 900px;
  }
</style>
