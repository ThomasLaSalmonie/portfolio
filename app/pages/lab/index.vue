<script setup lang="ts">
  const experiments = [
    {
      slug: 'pong',
      title: 'Pong Wars',
      description: 'Day-vs-night canvas simulation.'
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
  <div class="flex flex-col gap-8">
    <Html lang="en">
      <Head>
        <Title>Lab — Thomas La Salmonie</Title>
        <Meta name="description" content="Small front-end experiments and demos." />
      </Head>
    </Html>

    <SectionHeading eyebrow="Lab" title="Experiments" as="h1">
      Throwaway front-end sketches — canvas, CSS, tour libraries. Not portfolio pieces.
    </SectionHeading>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in experiments" :key="item.slug">
        <NuxtLink
          :to="`/lab/${item.slug}`"
          class="group flex h-full flex-col gap-2 rounded-lg border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-[280ms] ease-[var(--ease-standard)] hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-md"
        >
          <span class="font-mono text-xs text-muted-foreground">/{{ item.slug }}</span>
          <h2 class="font-display text-lg font-bold">{{ item.title }}</h2>
          <p class="text-sm text-muted-foreground">{{ item.description }}</p>
          <span class="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-primary">
            Open
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
