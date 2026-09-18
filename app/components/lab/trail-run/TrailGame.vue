<script setup lang="ts">
  import { Button } from '~/components/ui/button';
  import { courses } from '~/data/trail-run/courses';
  import {
    createRunner,
    formatTime,
    metrics,
    readBest,
    recordKey,
    step,
    STEP,
    validateCourse
  } from '~/utils/trail-run/engine';
  import { render, WIDTH, HEIGHT } from '~/utils/trail-run/render';
  import type { Runner } from '~/utils/trail-run/engine';

  const { t } = useI18n();
  const canvas = ref<HTMLCanvasElement>();
  const preview = ref<HTMLCanvasElement>();
  const gameDialog = ref<HTMLDialogElement>();
  const controlsDialog = ref<HTMLDialogElement>();
  const fullscreenHost = ref<HTMLDivElement>();
  const launchButton = ref<HTMLButtonElement>();
  const opened = ref(false);
  const launching = ref(false);
  let hadFullscreen = false;
  const course = courses[0]!;
  const stats = metrics(course);
  const state = ref<'selecting' | 'running' | 'paused' | 'finished' | 'error'>('selecting');
  const snapshot = ref<Runner>(createRunner(course));
  const best = ref<number | null>(null);
  const newBest = ref(false);
  const storageFailed = ref(false);
  const ready = ref(false);
  let runner = createRunner(course);
  let frame = 0;
  let last = 0;
  let accumulator = 0;
  let uiTime = 0;
  let reduced = false;
  const keys = new Set<string>();
  let jumpPressed = false;
  const profile = computed(() =>
    course.points.map((p) => `${(p.x / course.finish) * 300},${10 + (p.y / 400) * 50}`).join(' ')
  );
  const progress = computed(() => Math.min(100, (snapshot.value.x / course.finish) * 100));
  const section = computed(() =>
    snapshot.value.x < 2900
      ? 'forest'
      : snapshot.value.x < 6400
        ? 'climb'
        : snapshot.value.x < 6850
          ? 'summit'
          : 'descent'
  );
  const announcement = computed(() =>
    state.value === 'running'
      ? snapshot.value.respawn > 0
        ? t('trail.respawn')
        : t('trail.sections.' + section.value)
      : t('trail.states.' + state.value)
  );

  function draw() {
    const ctx = canvas.value?.getContext('2d');
    if (!ctx) {
      state.value = 'error';
      return;
    }
    render(ctx, course, runner, reduced);
  }
  function sync() {
    snapshot.value = { ...runner };
  }
  function clearInput() {
    keys.clear();
    jumpPressed = false;
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    clearInput();
  }
  function save() {
    newBest.value = best.value === null || runner.elapsed < best.value;
    if (!newBest.value) return;
    best.value = runner.elapsed;
    try {
      localStorage.setItem(recordKey(course), JSON.stringify(best.value));
    } catch {
      storageFailed.value = true;
    }
  }
  function tick(now: number) {
    if (state.value !== 'running') return;
    accumulator += Math.min((now - last) / 1000, 0.1);
    last = now;
    while (accumulator >= STEP) {
      step(course, runner, {
        direction:
          Number(keys.has('ArrowRight') || keys.has('KeyD')) -
          Number(keys.has('ArrowLeft') || keys.has('KeyA')),
        jump: keys.has('Space'),
        jumpPressed,
        sprint: keys.has('ShiftLeft') || keys.has('ShiftRight')
      });
      jumpPressed = false;
      accumulator -= STEP;
      if (runner.finished) {
        state.value = 'finished';
        stop();
        save();
        sync();
        draw();
        return;
      }
    }
    if (now - uiTime > 50) {
      sync();
      uiTime = now;
    }
    draw();
    frame = requestAnimationFrame(tick);
  }
  function run() {
    stop();
    state.value = 'running';
    accumulator = 0;
    last = performance.now();
    controlsDialog.value?.close();
    canvas.value?.focus({ preventScroll: true });
    frame = requestAnimationFrame(tick);
  }
  function start() {
    runner = createRunner(course);
    newBest.value = false;
    sync();
    run();
  }
  function pause() {
    if (state.value === 'running') {
      state.value = 'paused';
      stop();
      sync();
    }
  }
  async function launch() {
    if (!ready.value || launching.value) return;
    launching.value = true;
    stop();
    runner = createRunner(course);
    newBest.value = false;
    state.value = 'selecting';
    sync();
    opened.value = true;
    gameDialog.value?.showModal();
    draw();
    // Fullscreen must be requested from the Start button's user gesture.
    // The dialog still fills the viewport if the browser declines fullscreen.
    try {
      await fullscreenHost.value?.requestFullscreen();
      hadFullscreen = document.fullscreenElement === fullscreenHost.value;
    } catch {
      hadFullscreen = false;
    } finally {
      launching.value = false;
      if (opened.value) controlsDialog.value?.showModal();
    }
  }
  function showControls() {
    pause();
    controlsDialog.value?.showModal();
  }
  function dismissControls() {
    if (state.value === 'selecting') start();
    else run();
  }
  async function closeGame() {
    stop();
    opened.value = false;
    controlsDialog.value?.close();
    gameDialog.value?.close();
    hadFullscreen = false;
    if (document.fullscreenElement === fullscreenHost.value) {
      await document.exitFullscreen().catch(() => {});
    }
    await nextTick();
    if (!opened.value && launchButton.value?.isConnected) {
      launchButton.value.focus({ preventScroll: true });
    }
  }
  function fullscreenChange() {
    if (hadFullscreen && document.fullscreenElement !== fullscreenHost.value) closeGame();
  }
  function keydown(event: KeyboardEvent) {
    if (
      !opened.value ||
      controlsDialog.value?.open ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      document.activeElement !== canvas.value
    )
      return;
    if (event.code === 'Escape') {
      event.preventDefault();
      if (state.value === 'running') pause();
      else if (state.value === 'paused') run();
      event.stopPropagation();
      return;
    }
    if (event.code === 'KeyR' && !event.repeat) {
      event.preventDefault();
      start();
      return;
    }
    if (
      state.value !== 'running' ||
      !['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight'].includes(
        event.code
      )
    )
      return;
    event.preventDefault();
    if (event.code === 'Space' && !keys.has('Space') && !event.repeat) jumpPressed = true;
    keys.add(event.code);
  }
  function keyup(event: KeyboardEvent) {
    keys.delete(event.code);
  }
  function visibility() {
    if (document.hidden) pause();
  }
  function motion(event: MediaQueryListEvent) {
    reduced = event.matches;
    draw();
  }
  let query: MediaQueryList | undefined;
  onMounted(() => {
    try {
      validateCourse(course);
      try {
        best.value = readBest(localStorage.getItem(recordKey(course)));
      } catch {
        storageFailed.value = true;
      }
      query = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduced = query.matches;
      query.addEventListener('change', motion);
      window.addEventListener('keydown', keydown);
      window.addEventListener('keyup', keyup);
      window.addEventListener('blur', pause);
      document.addEventListener('visibilitychange', visibility);
      document.addEventListener('fullscreenchange', fullscreenChange);
      const previewContext = preview.value?.getContext('2d');
      if (previewContext) render(previewContext, course, runner, reduced);
      draw();
      ready.value = true;
    } catch {
      state.value = 'error';
    }
  });
  onBeforeUnmount(() => {
    closeGame();
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
    window.removeEventListener('blur', pause);
    document.removeEventListener('visibilitychange', visibility);
    document.removeEventListener('fullscreenchange', fullscreenChange);
    query?.removeEventListener('change', motion);
  });
</script>

<template>
  <section :aria-label="t('trail.title')">
    <div class="relative overflow-hidden rounded-xl border bg-[#c6ded9] shadow-sm">
      <canvas
        ref="preview"
        :width="WIDTH"
        :height="HEIGHT"
        class="block aspect-video w-full"
        role="img"
        :aria-label="t('trail.preview')"
      />
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-[#153d36]/60 via-[#153d36]/10 to-transparent p-5"
      >
        <span class="font-mono text-xs tracking-widest text-white uppercase"
          >{{ t('trail.forestName') }} · {{ course.duration }} {{ t('trail.seconds') }}</span
        >
        <button
          ref="launchButton"
          class="flex min-h-16 items-center gap-4 rounded-xl bg-[#f7f5e9] px-9 py-4 text-xl font-bold text-[#243e38] shadow-xl transition-transform hover:scale-105 disabled:opacity-50"
          :disabled="!ready || launching"
          @click="launch"
        >
          <span aria-hidden="true">▶</span> {{ t('trail.launch') }}
        </button>
        <span class="text-xs text-white">{{ t('trail.fullscreenHint') }}</span>
      </div>
    </div>
    <p v-if="state === 'error'" class="mt-3 text-sm" role="alert">{{ t('trail.errorHelp') }}</p>

    <dialog
      ref="gameDialog"
      class="game-dialog"
      :aria-label="t('trail.title')"
      @cancel.prevent="closeGame"
    >
      <div ref="fullscreenHost" class="game-host">
        <header
          class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
        >
          <div>
            <span class="font-display font-bold">{{ t('trail.title') }}</span
            ><span class="ml-3 hidden text-xs text-white/60 sm:inline">{{
              t('trail.sections.' + section)
            }}</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-mono text-sm tabular-nums">{{ formatTime(snapshot.elapsed) }}</span>
            <meter
              :value="snapshot.stamina"
              min="0"
              max="100"
              class="h-3 w-20"
              :aria-label="t('trail.energy')"
            />
            <button class="game-action" @click="closeGame">
              {{ t('trail.exit') }} <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>
        <div class="game-scene">
          <canvas
            ref="canvas"
            :width="WIDTH"
            :height="HEIGHT"
            :tabindex="opened ? 0 : -1"
            class="game-canvas"
            :aria-label="t('trail.canvas')"
            @blur="pause"
            >{{ t('trail.canvas') }}</canvas
          >
          <div
            v-if="state === 'paused' || state === 'finished' || state === 'error'"
            class="absolute inset-0 flex items-center justify-center overflow-auto bg-black/30 p-4 backdrop-blur-[2px]"
          >
            <div
              class="w-full max-w-sm rounded-xl border border-white/15 bg-[#172b29] p-6 text-white shadow-xl"
            >
              <template v-if="state === 'paused'">
                <p class="mb-2 font-mono text-xs text-white/60 uppercase">
                  {{ t('trail.breathe') }}
                </p>
                <h2 class="text-2xl">{{ t('trail.states.paused') }}</h2>
                <Button class="mt-5 w-full" @click="run">{{ t('trail.resume') }}</Button>
                <button class="game-action mt-3 w-full" @click="showControls">
                  {{ t('trail.controlsTitle') }}
                </button>
              </template>
              <template v-else-if="state === 'finished'">
                <p class="mb-2 font-mono text-xs text-white/60 uppercase">
                  {{ newBest ? t('trail.newBest') : t('trail.wellRun') }}
                </p>
                <h2 class="text-2xl">{{ t('trail.states.finished') }}</h2>
                <p class="mt-3 font-mono text-4xl tabular-nums">
                  {{ formatTime(snapshot.elapsed) }}
                </p>
                <p class="mt-3 text-sm">
                  {{ t('trail.falls') }}: {{ snapshot.falls }} · ↗ {{ stats.gain }} m ·
                  {{ stats.distance }} m
                </p>
                <p class="mt-2 text-sm">
                  {{ t('trail.best') }}: {{ best === null ? '—' : formatTime(best) }}
                </p>
                <Button class="mt-5 w-full" @click="start">{{ t('trail.retry') }}</Button>
                <button class="game-action mt-3 w-full" @click="closeGame">
                  {{ t('trail.exit') }}
                </button>
              </template>
              <template v-else
                ><h2 class="text-xl">{{ t('trail.states.error') }}</h2>
                <p class="mt-3 text-sm">{{ t('trail.errorHelp') }}</p></template
              >
            </div>
          </div>
        </div>
        <footer
          class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-2 text-xs sm:px-6"
        >
          <div class="flex items-center gap-3">
            <svg viewBox="0 0 300 72" class="h-8 w-28" role="img" :aria-label="t('trail.profile')">
              <polyline
                :points="profile"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                opacity="0.4"
              />
              <line
                :x1="progress * 3"
                y1="0"
                :x2="progress * 3"
                y2="72"
                stroke="#9fd4bb"
                stroke-width="5"
              /></svg
            ><span class="font-mono">{{ Math.floor(progress) }}%</span>
          </div>
          <div class="flex gap-4">
            <button v-if="state === 'running'" class="game-action" @click="pause">
              {{ t('trail.pause') }}
            </button>
            <button
              v-if="state !== 'finished' && state !== 'error'"
              class="game-action"
              @click="showControls"
            >
              {{ t('trail.controlsTitle') }}
            </button>
            <button
              v-if="state === 'running' || state === 'paused'"
              class="game-action"
              @click="start"
            >
              {{ t('trail.retry') }}
            </button>
          </div>
        </footer>
        <p v-if="storageFailed" class="px-4 pb-2 text-xs text-white/70" role="status">
          {{ t('trail.storageFailed') }}
        </p>
        <p class="sr-only" role="status" aria-live="polite">{{ announcement }}</p>

        <dialog
          ref="controlsDialog"
          class="controls-dialog"
          aria-labelledby="trail-controls-title"
          aria-describedby="trail-controls-intro"
          @cancel.prevent="closeGame"
        >
          <p class="font-mono text-xs tracking-widest text-white/60 uppercase">
            {{ t('trail.forestName') }} · {{ t('trail.easy') }}
          </p>
          <h2 id="trail-controls-title" class="mt-3 text-3xl">{{ t('trail.controlsTitle') }}</h2>
          <p id="trail-controls-intro" class="mt-3 text-sm leading-relaxed text-white/70">
            {{ t('trail.controlsIntro') }}
          </p>
          <dl class="my-6 flex flex-col gap-3 text-sm">
            <div class="control-row">
              <dt><kbd>← →</kbd> / <kbd>A D</kbd></dt>
              <dd>{{ t('trail.move') }}</dd>
            </div>
            <div class="control-row">
              <dt>
                <kbd>{{ t('trail.space') }}</kbd>
              </dt>
              <dd>{{ t('trail.jump') }}</dd>
            </div>
            <div class="control-row">
              <dt><kbd>Shift</kbd></dt>
              <dd>{{ t('trail.sprint') }}</dd>
            </div>
            <div class="control-row">
              <dt><kbd>Esc</kbd></dt>
              <dd>{{ t('trail.escapeHint') }}</dd>
            </div>
            <div class="control-row">
              <dt><kbd>R</kbd></dt>
              <dd>{{ t('trail.retry') }}</dd>
            </div>
          </dl>
          <p class="text-sm leading-relaxed text-white/70">{{ t('trail.tip') }}</p>
          <p class="touch-note mt-3 text-sm text-white/70">{{ t('trail.touch') }}</p>
          <Button class="mt-6 w-full" @click="dismissControls"
            >{{ state === 'selecting' ? t('trail.start') : t('trail.resume') }}
            <span aria-hidden="true">→</span></Button
          >
          <button class="game-action mt-3 w-full" @click="closeGame">
            {{ t('trail.backToPreview') }}
          </button>
        </dialog>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
  canvas {
    image-rendering: pixelated;
  }
  .game-dialog {
    width: 100vw;
    max-width: none;
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: #10221f;
    color: #f1f4ec;
  }
  .game-dialog::backdrop {
    background: #10221f;
  }
  .game-host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #10221f;
    color: #f1f4ec;
  }
  .game-host:fullscreen {
    width: 100vw;
    height: 100dvh;
  }
  .game-scene {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
  }
  .game-canvas {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    outline-offset: -4px;
  }
  .controls-dialog {
    width: min(30rem, calc(100vw - 2rem));
    max-height: calc(100dvh - 2rem);
    margin: auto;
    padding: clamp(1.25rem, 4vw, 2rem);
    overflow-y: auto;
    border: 1px solid #ffffff26;
    border-radius: 1rem;
    background: #172b29;
    color: #f1f4ec;
    box-shadow: 0 24px 80px #0006;
  }
  .controls-dialog::backdrop {
    background: #071c17a6;
    backdrop-filter: blur(5px);
  }
  .control-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .control-row dt {
    flex-shrink: 0;
  }
  .control-row dd {
    text-align: right;
    color: #ffffffb3;
  }
  kbd {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border: 1px solid #ffffff30;
    border-radius: 4px;
    color: #f1f4ec;
    font-family: var(--font-mono);
  }
  .game-action {
    min-height: 32px;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .touch-note {
    display: none;
  }
  @media (pointer: coarse) {
    .touch-note {
      display: block;
    }
  }
</style>
