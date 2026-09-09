<script setup lang="ts">
  import { Button } from '~/components/ui/button';
  import { getFeaturedProjects } from '~/utils/portfolio';

  // useState so the random pick is chosen once (at prerender) and reused on
  // hydration — avoids an SSR/client mismatch.
  const featured = useState('home:featured', () => getFeaturedProjects(3));

  const services = [
    { title: 'Web development', body: 'From static sites to full-scale web applications.' },
    { title: 'UI / UX', body: 'Interfaces that stay legible under real-world data and load.' },
    { title: 'Data & APIs', body: 'Schema design, GraphQL and REST services, caching layers.' },
    { title: 'CI / CD', body: 'Pipelines, containers and the infrastructure underneath.' }
  ];
</script>

<template>
  <div class="flex flex-col gap-20">
    <Html lang="en">
      <Head>
        <Title>Thomas La Salmonie</Title>
        <Meta
          name="description"
          content="Thomas La Salmonie — full-stack web engineer based in Montréal."
        />
      </Head>
    </Html>

    <Hero
      eyebrow="Montréal · Full-stack web"
      title="I build web software, end to end."
      lead="Self-taught engineer working across Vue / Nuxt front-ends, Node services and the infrastructure under them. Curious, precise, and focused on quality and knowledge-sharing."
      image="/profile.jpeg"
      image-alt="Thomas La Salmonie"
    >
      <template #actions>
        <Button as-child>
          <NuxtLink to="/work">See the work</NuxtLink>
        </Button>
        <Button as-child variant="outline">
          <NuxtLink to="/contact">Get in touch</NuxtLink>
        </Button>
      </template>
    </Hero>

    <section class="flex flex-col gap-5">
      <SectionHeading eyebrow="TL;DR" title="How I work" />
      <div class="prose-measure flex flex-col gap-3 text-muted-foreground">
        <p>
          Engineer by training, specialised in web technologies. I take a step back to measure the
          stakes of a project and adapt quickly to new environments.
        </p>
        <p>
          I keep questioning the work in order to bring it as close as possible to what users
          actually expect — and I care about the collaboration and knowledge-sharing around it as
          much as the code.
        </p>
      </div>
    </section>

    <section v-if="featured.length" class="flex flex-col gap-6">
      <SectionHeading eyebrow="Selected work" title="Featured projects">
        A rotating pick from the full list.
      </SectionHeading>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in featured" :key="project.slug" :project="project" />
      </div>
      <NuxtLink to="/work" class="link-accent w-fit text-sm font-medium">
        See all projects →
      </NuxtLink>
    </section>

    <section class="flex flex-col gap-6">
      <SectionHeading eyebrow="Services" title="What I take on" />
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
      <SectionHeading eyebrow="Writing" title="Notes — coming soon" />
      <div class="rounded-lg border border-dashed p-6">
        <p class="prose-measure text-sm text-muted-foreground">
          Notes on Nuxt, type systems and shipping side projects. Not published yet — the section is
          wired and waiting for the first post.
        </p>
      </div>
    </section>
  </div>
</template>
