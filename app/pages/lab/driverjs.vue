<script setup lang="ts">
  import { driver, type Driver } from 'driver.js';
  import 'driver.js/dist/driver.css';
  import { Button } from '~/components/ui/button';

  useSeoMeta({
    title: 'Driver.js tour',
    description: 'A driver.js guided tour that walks through this portfolio site — Lab experiment.'
  });

  const SEEN_KEY = 'lab:driverjs-seen';
  let tour: Driver | undefined;

  function buildTour(): Driver {
    return driver({
      showProgress: true,
      overlayOpacity: 0.6,
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Done',
      onDestroyStarted: () => {
        try {
          localStorage.setItem(SEEN_KEY, 'true');
        } catch {
          // private mode / storage disabled — the tour just runs every visit
        }
        tour?.destroy();
      },
      steps: [
        {
          popover: {
            title: 'A quick tour',
            description: 'This is a driver.js demo. Use Next / Back, or press Esc to leave.'
          }
        },
        {
          element: '#btn-home',
          popover: {
            title: 'The wordmark',
            description: 'Top-left on every page — it always takes you back home.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-work',
          popover: {
            title: 'Primary navigation',
            description: 'Work, About, Skills, Lab, Contact.',
            side: 'bottom'
          }
        },
        {
          element: '#theme-toggle',
          popover: {
            title: 'Light / dark',
            description:
              'Themes are a designed pair, not an inversion — cobalt lightens and desaturates on the dark ground. Your choice is remembered.',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-stack',
          popover: {
            title: 'How it is built',
            description: 'Nuxt 4 + Vue 3, Tailwind v4 with shadcn-vue.',
            side: 'top'
          }
        },
        {
          element: '#tour-data',
          popover: {
            title: 'No backend',
            description: 'Projects, skills and the career timeline are typed TypeScript',
            side: 'top'
          }
        },
        {
          element: '#btn-restart',
          popover: {
            title: 'That is driver.js',
            description: 'Roughly 40 lines of config for the whole thing. Hit replay any time.',
            side: 'top'
          }
        }
      ]
    });
  }

  function start() {
    tour = buildTour();
    tour.drive();
  }

  onMounted(() => {
    let seen = 'false';
    try {
      seen = localStorage.getItem(SEEN_KEY) ?? 'false';
    } catch {
      seen = 'false';
    }
    if (seen !== 'true') start();
  });

  onBeforeUnmount(() => tour?.destroy());
</script>

<template>
  <div class="flex flex-col gap-10">
    <SectionHeading eyebrow="Lab · driver.js" title="A guided tour of this site" as="h1">
      <a href="https://driverjs.com" target="_blank" rel="noopener" class="link-accent"
        >driver.js</a
      >
      does spotlight product tours in a few KB.
    </SectionHeading>

    <Button id="btn-restart" class="w-fit" @click="start">Replay the tour</Button>

    <section id="tour-stack" class="flex flex-col gap-3 scroll-mt-24">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        The stack
      </h2>
      <div class="flex flex-wrap gap-1.5">
        <span class="chip">Nuxt 4</span>
        <span class="chip">Vue 3</span>
        <span class="chip">TypeScript</span>
        <span class="chip">Tailwind v4</span>
        <span class="chip">shadcn-vue</span>
        <span class="chip">Static HTML</span>
      </div>
      <p class="prose-measure text-sm text-muted-foreground">
        Icons are inlined at build, fonts are self-hosted, and the whole colour system is OKLCH
        custom properties with a designed dark counterpart.
      </p>
    </section>

    <section id="tour-data" class="flex flex-col gap-3 scroll-mt-24">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        The data layer
      </h2>
      <p class="prose-measure text-sm text-muted-foreground">
        Projects, skills and the career timeline are plain typed arrays in
        <code class="font-mono text-xs">app/data/</code>. Pure functions in
        <code class="font-mono text-xs">app/utils/portfolio.ts</code> do the joins — skills resolved
        by key, projects by slug.
      </p>
    </section>
  </div>
</template>

<style>
  /* Adapt the driver.js popover to the design tokens (it is portalled to <body>). */
  .driver-popover {
    background: var(--popover);
    color: var(--popover-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .driver-popover-title,
  .driver-popover-description {
    color: var(--popover-foreground);
  }

  .driver-popover-progress-text {
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: 0.7rem;
  }

  .driver-popover-arrow {
    border-color: var(--popover);
  }

  .driver-popover-navigation-btns button.driver-popover-next-btn {
    background: var(--primary);
    color: var(--primary-foreground);
    text-shadow: none;
    border-radius: var(--radius-sm);
  }

  .driver-popover-navigation-btns button.driver-popover-prev-btn {
    background: transparent;
    color: var(--muted-foreground);
    text-shadow: none;
  }

  .driver-popover-close-btn {
    color: var(--muted-foreground);
  }
</style>
