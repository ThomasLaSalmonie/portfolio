<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'nuxt/app';
  import { getProjects, getProjectWithSkills } from '~/utils/portfolio';

  const route = useRoute();
  const slug = computed(() => String(route.params.slug));
  const project = computed(() => getProjectWithSkills(slug.value));

  // At prerender / SSR an unknown slug is a 404; on the client the computed stays
  // reactive so in-app navigation between projects works.
  if (import.meta.server && !project.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
  }

  const siblings = computed(() => {
    const all = getProjects();
    const i = all.findIndex((p) => p.slug === slug.value);
    return {
      prev: i > 0 ? all[i - 1] : undefined,
      next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined
    };
  });
</script>

<template>
  <div v-if="project" class="flex flex-col gap-16">
    <Html lang="en">
      <Head>
        <Title>{{ project.name }} — Thomas La Salmonie</Title>
        <Meta name="description" :content="project.shortDescription" />
      </Head>
    </Html>

    <div class="flex flex-col gap-5 py-6">
      <NuxtLink to="/work" class="flex w-fit items-center gap-1 text-sm text-muted-foreground">
        <Icon name="lucide:arrow-left" size="16" /> Work
      </NuxtLink>
      <div class="flex flex-col gap-4">
        <h1 class="text-[clamp(2rem,5vw,3rem)] leading-[1.08] font-black tracking-tight">
          {{ project.name }}
        </h1>
        <div class="flex flex-wrap items-center gap-3">
          <StatusBadge :status="project.status" />
          <p v-if="project.shortDescription" class="text-lg text-muted-foreground">
            {{ project.shortDescription }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="project.banner" class="overflow-hidden rounded-xl border">
      <NuxtImg
        :src="project.banner"
        :alt="`${project.name} — screenshot`"
        class="w-full object-cover"
        sizes="sm:100vw lg:1120px"
      />
    </div>

    <div v-if="project.blocks && project.blocks.length" class="flex flex-col gap-10">
      <article
        v-for="(block, index) in project.blocks"
        :key="index"
        class="flex flex-col gap-5 md:items-start md:gap-8"
        :class="[
          block.image && 'md:flex-row',
          block.image && block.imagePosition === 'right' && 'md:flex-row-reverse'
        ]"
      >
        <NuxtImg
          v-if="block.image"
          :src="block.image"
          alt=""
          class="w-full rounded-lg border md:w-56"
          loading="lazy"
          sizes="sm:100vw md:224px"
        />
        <div class="prose-measure flex flex-col gap-2">
          <h2 v-if="block.title" class="font-display text-xl font-bold">{{ block.title }}</h2>
          <p class="text-muted-foreground">{{ block.content }}</p>
        </div>
      </article>
    </div>

    <section v-if="project.links && project.links.length" class="flex flex-col gap-3">
      <SectionHeading eyebrow="Links" title="External" />
      <ul class="flex flex-col gap-1.5">
        <li v-for="link in project.links" :key="link">
          <a :href="link" target="_blank" rel="noopener" class="link-accent text-sm break-all">
            {{ link }}
          </a>
        </li>
      </ul>
    </section>

    <section v-if="project.skills && project.skills.length" class="flex flex-col gap-3">
      <SectionHeading eyebrow="Stack" title="Technologies used" />
      <div class="flex flex-wrap gap-1.5">
        <SkillItem v-for="skill in project.skills" :key="skill.key" :skill="skill" />
      </div>
    </section>

    <nav
      v-if="siblings.prev || siblings.next"
      class="flex justify-between gap-4 border-t pt-6 text-sm"
    >
      <NuxtLink
        v-if="siblings.prev"
        :to="`/projects/${siblings.prev.slug}`"
        class="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="lucide:arrow-left" size="16" /> {{ siblings.prev.name }}
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="siblings.next"
        :to="`/projects/${siblings.next.slug}`"
        class="flex items-center gap-1 text-right text-muted-foreground transition-colors hover:text-foreground"
      >
        {{ siblings.next.name }} <Icon name="lucide:arrow-right" size="16" />
      </NuxtLink>
      <span v-else />
    </nav>
  </div>
</template>
