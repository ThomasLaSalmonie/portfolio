<script setup lang="ts">
  import { socials, CONTACT_EMAIL, LOCATION } from '~/utils/contact';
</script>

<template>
  <div class="flex flex-col gap-10">
    <Html lang="en">
      <Head>
        <Title>Contact — Thomas La Salmonie</Title>
        <Meta
          name="description"
          content="Get in touch with Thomas La Salmonie — email and social links."
        />
      </Head>
    </Html>

    <div class="flex flex-col gap-2">
      <span class="eyebrow">Email</span>
      <a
        :href="`mailto:${CONTACT_EMAIL}`"
        class="link-accent w-fit font-display text-xl font-bold sm:text-2xl"
      >
        {{ CONTACT_EMAIL }}
      </a>
      <span class="font-mono text-xs text-muted-foreground">{{ LOCATION }}</span>
    </div>

    <ul class="flex flex-col divide-y rounded-lg border">
      <li v-for="social in socials" :key="social.label">
        <a
          :href="social.href"
          target="_blank"
          rel="me noopener"
          class="flex items-center gap-4 p-4 transition-colors hover:bg-accent"
        >
          <Icon :name="social.icon" size="20" class="text-muted-foreground" />
          <span class="text-sm font-medium">{{ social.label }}</span>
          <span class="ml-auto font-mono text-xs text-muted-foreground">{{ social.handle }}</span>
          <Icon name="lucide:arrow-up-right" size="16" class="text-muted-foreground" />
        </a>
      </li>
    </ul>
  </div>
</template>
