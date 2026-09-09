<script setup lang="ts">
  useHead({
    htmlAttrs: { lang: 'en' },
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ],
    meta: [
      { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#fbfaf7' },
      { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#14151c' }
    ]
  });
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <Header />
    <main class="container-page flex-1 py-10 sm:py-14">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
