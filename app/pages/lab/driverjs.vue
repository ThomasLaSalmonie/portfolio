<script setup lang="ts">
  import { driver, type Driver } from 'driver.js';
  import 'driver.js/dist/driver.css';
  import { Button } from '~/components/ui/button';

  const { t } = useI18n();

  useSeoMeta({
    title: () => t('driverjs.seoTitle'),
    description: () => t('driverjs.seoDescription')
  });

  const SEEN_KEY = 'lab:driverjs-seen';
  let tour: Driver | undefined;

  function buildTour(): Driver {
    return driver({
      showProgress: true,
      overlayOpacity: 0.6,
      nextBtnText: t('driverjs.next'),
      prevBtnText: t('driverjs.prev'),
      doneBtnText: t('driverjs.done'),
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
          popover: { title: t('driverjs.s1Title'), description: t('driverjs.s1Body') }
        },
        {
          element: '#btn-home',
          popover: {
            title: t('driverjs.s2Title'),
            description: t('driverjs.s2Body'),
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#nav-work',
          popover: {
            title: t('driverjs.s3Title'),
            description: t('driverjs.s3Body'),
            side: 'bottom'
          }
        },
        {
          element: '#theme-toggle',
          popover: {
            title: t('driverjs.s4Title'),
            description: t('driverjs.s4Body'),
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-stack',
          popover: {
            title: t('driverjs.s5Title'),
            description: t('driverjs.s5Body'),
            side: 'top'
          }
        },
        {
          element: '#tour-data',
          popover: {
            title: t('driverjs.s6Title'),
            description: t('driverjs.s6Body'),
            side: 'top'
          }
        },
        {
          element: '#btn-restart',
          popover: {
            title: t('driverjs.s7Title'),
            description: t('driverjs.s7Body'),
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
    <SectionHeading :eyebrow="t('driverjs.eyebrow')" :title="t('driverjs.title')" as="h1">
      <i18n-t keypath="driverjs.blurb" tag="span" scope="global">
        <template #link>
          <a href="https://driverjs.com" target="_blank" rel="noopener" class="link-accent">
            {{ t('driverjs.linkText') }}
          </a>
        </template>
      </i18n-t>
    </SectionHeading>

    <Button id="btn-restart" class="w-fit" @click="start">{{ t('actions.replayTour') }}</Button>

    <section id="tour-stack" class="flex flex-col gap-3 scroll-mt-24">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {{ t('driverjs.stackHeading') }}
      </h2>
      <div class="flex flex-wrap gap-1.5">
        <span class="chip">Nuxt 4</span>
        <span class="chip">Vue 3</span>
        <span class="chip">TypeScript</span>
        <span class="chip">Tailwind v4</span>
        <span class="chip">shadcn-vue</span>
        <span class="chip">Static HTML</span>
      </div>
      <p class="prose-measure text-sm text-muted-foreground">{{ t('driverjs.stackProse') }}</p>
    </section>

    <section id="tour-data" class="flex flex-col gap-3 scroll-mt-24">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {{ t('driverjs.dataHeading') }}
      </h2>
      <i18n-t
        keypath="driverjs.dataProse"
        tag="p"
        scope="global"
        class="prose-measure text-sm text-muted-foreground"
      >
        <template #dataDir>
          <code class="font-mono text-xs">app/data/</code>
        </template>
        <template #utilFile>
          <code class="font-mono text-xs">app/utils/portfolio.ts</code>
        </template>
      </i18n-t>
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
