<script setup lang="ts">
  const { t } = useI18n();

  // <html lang>/<dir>, hreflang alternates and og:locale come from @nuxtjs/i18n.
  useHead(useLocaleHead());

  // Site-wide social-card defaults. Pages set their own title/description via
  // useSeoMeta; the image is one shared static card (see scripts/gen-og.mjs).
  useSeoMeta({
    ogImage: '/og.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    // The shared card is a fixed English design, so its alt text stays English.
    ogImageAlt: 'Thomas La Salmonie — full-stack web engineer',
    twitterCard: 'summary_large_image'
  });

  useHead({
    // Per-page title (from useSeoMeta) gets the site name appended; a missing
    // title, or the site name itself, renders bare.
    titleTemplate: (title) =>
      !title || title === 'Thomas La Salmonie'
        ? 'Thomas La Salmonie'
        : `${title} — Thomas La Salmonie`,
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ],
    meta: [
      { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#fbfaf7' },
      { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#14151c' },
      // Defence-in-depth CSP. The deploy is static files behind nginx, so real
      // response headers (HSTS, X-Frame-Options, …) live in
      // deploy/nginx.conf.example; this <meta> is what the site enforces on its
      // own. 'unsafe-inline' is required for Nuxt's hydration + colour-mode
      // no-flash scripts; everything else is locked to same-origin plus the
      // banner host.
      {
        'http-equiv': 'Content-Security-Policy',
        content:
          "default-src 'self'; " +
          "img-src 'self' data: https://img.thomaslasalmonie.me; " +
          "font-src 'self' data:; " +
          "style-src 'self' 'unsafe-inline'; " +
          "script-src 'self' 'unsafe-inline'; " +
          "connect-src 'self'; " +
          "manifest-src 'self'; " +
          "worker-src 'self'; " +
          "base-uri 'self'; " +
          "form-action 'self'; " +
          "object-src 'none'; " +
          'upgrade-insecure-requests'
      }
    ]
  });
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only rounded-md border bg-card px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {{ t('nav.skipToContent') }}
    </a>
    <Header />
    <main id="main" tabindex="-1" class="container-page flex-1 py-10 outline-none sm:py-14">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
