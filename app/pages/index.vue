<script setup lang="ts">
  import { Button } from '~/components/ui/button';
  import { getFeaturedProjectSlugs, getProject } from '~/utils/portfolio';
  import type { Project } from '~/utils/types/projects.types';

  const { t } = useI18n();
  const localePath = useLocalePath();
  const lang = useLang();

  useSeoMeta({
    title: 'Thomas La Salmonie',
    description: () => t('home.seoDescription')
  });

  // useState so the random pick is chosen once (at prerender) and reused on
  // hydration — avoids an SSR/client mismatch. Slugs only, so a client-side
  // locale switch re-resolves the copy.
  const featuredSlugs = useState('home:featured', () => getFeaturedProjectSlugs(3));
  const featured = computed(() =>
    featuredSlugs.value
      .map((slug) => getProject(slug, lang.value))
      .filter((project): project is Project => project != null)
  );

  const services = computed(() => [
    { title: t('home.serviceWebTitle'), body: t('home.serviceWebBody') },
    { title: t('home.serviceUiTitle'), body: t('home.serviceUiBody') },
    { title: t('home.serviceDataTitle'), body: t('home.serviceDataBody') },
    { title: t('home.serviceCicdTitle'), body: t('home.serviceCicdBody') }
  ]);
</script>

<template>
  <div class="flex flex-col gap-20">
    <Hero
      :eyebrow="t('home.heroEyebrow')"
      :title="t('home.heroTitle')"
      :lead="t('home.heroLead')"
      image="/profile.jpeg"
      :image-alt="t('home.heroImageAlt')"
    >
      <template #actions>
        <Button as-child>
          <NuxtLink :to="localePath('/work')">{{ t('actions.seeWork') }}</NuxtLink>
        </Button>
        <Button as-child variant="outline">
          <NuxtLink :to="localePath('/contact')">{{ t('actions.getInTouch') }}</NuxtLink>
        </Button>
      </template>
    </Hero>

    <section class="flex flex-col gap-5">
      <SectionHeading :eyebrow="t('home.howEyebrow')" :title="t('home.howTitle')" />
      <div class="prose-measure flex flex-col gap-3 text-muted-foreground">
        <p>{{ t('home.howP1') }}</p>
        <p>{{ t('home.howP2') }}</p>
      </div>
    </section>

    <section v-if="featured.length" class="flex flex-col gap-6">
      <SectionHeading :eyebrow="t('home.featuredEyebrow')" :title="t('home.featuredTitle')">
        {{ t('home.featuredNote') }}
      </SectionHeading>
      <ul class="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="project in featured" :key="project.slug">
          <ProjectCard :project="project" />
        </li>
      </ul>
      <NuxtLink :to="localePath('/work')" class="link-accent w-fit text-sm font-medium">
        {{ t('actions.seeAllProjects') }} →
      </NuxtLink>
    </section>

    <section class="flex flex-col gap-6">
      <SectionHeading :eyebrow="t('home.servicesEyebrow')" :title="t('home.servicesTitle')" />
      <div class="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
        <div
          v-for="service in services"
          :key="service.title"
          class="flex flex-col gap-1.5 bg-background p-5"
        >
          <h3 class="font-mono text-sm font-medium tracking-wide uppercase">{{ service.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ service.body }}</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <SectionHeading :eyebrow="t('home.writingEyebrow')" :title="t('home.writingTitle')" />
      <div class="rounded-lg border border-dashed p-6">
        <p class="prose-measure text-sm text-muted-foreground">{{ t('home.writingBody') }}</p>
      </div>
    </section>
  </div>
</template>
