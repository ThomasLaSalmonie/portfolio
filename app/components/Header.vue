<script setup lang="ts">
  import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogDescription
  } from 'reka-ui';

  const links = [
    { to: '/work', label: 'Work', id: 'nav-work' },
    { to: '/about', label: 'About', id: 'nav-about' },
    { to: '/skills', label: 'Skills', id: 'nav-skills' },
    { to: '/lab', label: 'Lab', id: 'nav-lab' },
    { to: '/contact', label: 'Contact', id: 'nav-contact' }
  ];

  const open = ref(false);
  const scrolled = ref(false);

  function onScroll() {
    scrolled.value = window.scrollY > 4;
  }

  onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  });
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b transition-colors duration-200"
    :class="
      scrolled ? 'border-border bg-background/80 backdrop-blur' : 'border-transparent bg-background'
    "
  >
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink
        id="btn-home"
        to="/"
        class="font-display text-[0.95rem] font-bold tracking-tight whitespace-nowrap"
      >
        Thomas La Salmonie
      </NuxtLink>

      <nav aria-label="Primary" class="hidden items-center gap-7 md:flex">
        <NuxtLink
          v-for="link in links"
          :id="link.id"
          :key="link.to"
          :to="link.to"
          class="nav-link text-sm text-muted-foreground transition-colors hover:text-foreground"
          active-class="nav-link--active"
        >
          {{ link.label }}
        </NuxtLink>
        <ThemeToggle id="theme-toggle" />
      </nav>

      <div class="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <DialogRoot v-model:open="open">
          <DialogTrigger
            class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Open menu"
          >
            <Icon name="lucide:menu" size="20" />
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay
              class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
            />
            <DialogContent
              class="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[80vw] flex-col gap-6 border-l bg-card p-6 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=open]:duration-[280ms] data-[state=closed]:duration-200"
            >
              <div class="flex items-center justify-between">
                <DialogTitle class="eyebrow">Menu</DialogTitle>
                <DialogClose
                  class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Close menu"
                >
                  <Icon name="lucide:x" size="18" />
                </DialogClose>
              </div>
              <DialogDescription class="sr-only">Site navigation</DialogDescription>
              <nav aria-label="Mobile" class="flex flex-col gap-1">
                <NuxtLink
                  v-for="link in links"
                  :key="link.to"
                  :to="link.to"
                  class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  active-class="bg-accent text-foreground"
                  @click="open = false"
                >
                  {{ link.label }}
                </NuxtLink>
              </nav>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .nav-link {
    position: relative;
    padding-block: 0.25rem;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.15rem;
    height: 2px;
    background: var(--primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur-2) var(--ease-standard);
  }

  .nav-link--active {
    color: var(--foreground);
  }

  .nav-link--active::after {
    transform: scaleX(1);
  }
</style>
