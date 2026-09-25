# One More Summit — Product Requirements Document

Status: three-course playable build implemented; release validation and human playtesting remain in progress.

Created: 2026-09-17 · Last updated: 2026-09-18  
Product owner: Thomas La Salmonie  
Working title: **One More Summit**  
Planned route: `/lab/trail-run` (and its French equivalent)

## 1. Purpose

Build a small, enjoyable trail-running game for the portfolio's Lab. Visitors control a
pixel-art runner in a side-view 2D platformer, navigating mountain terrain and trying to
improve their finish time. The game expresses Thomas's interest in trail running while
demonstrating thoughtful interaction design and frontend engineering.

This document is the source of truth for scope, decisions, acceptance criteria, and
delivery progress. Checkboxes describe delivered work, not merely agreed ideas.

## 2. Agreed direction and proposed defaults

### Agreed with Thomas

- Trail running is the theme, with a small controllable character.
- Pixel art is the visual direction.
- Gameplay uses a side view, like a Mario-style 2D platformer.
- Keyboard interaction is the primary input.
- Plan for selectable courses that vary in terrain, elevation, and duration.
- The game belongs in the Lab, discoverable from `app/pages/lab/index.vue`.

### Proposed defaults to validate during the prototype

- Working title: One More Summit; route: `/lab/trail-run`.
- Manual horizontal movement, variable-height jumps, and a stamina-based sprint.
- One handcrafted introductory course for the first release; more selectable courses next.
- Short time trials with forgiving checkpoints, unlimited retries, and local personal bests.
- No enemies: terrain, momentum, and pacing provide the challenge.
- Desktop keyboard play first; touch controls are a later milestone.

These defaults support implementation planning. They are not additional confirmed user
decisions; adjust them using prototype feedback and record changes in the decision log.

## 3. Audience, goals, and success measures

Primary audience: portfolio visitors who may have only a few minutes and no gaming experience.
Secondary audience: returning visitors who enjoy improving their time or trying another course.

| Goal                        | Validation target                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Easy to understand          | In a small playtest with at least three first-time players, each can start, move, and jump using the on-page instructions without coaching. |
| Approachable first course   | Most first-time playtesters finish Forest Loop within three attempts. Record observations rather than assuming this is achieved.            |
| Enjoyable movement          | Playtesters can deliberately make short and long jumps and recover from mistakes; record confusing or frustrating sections.                 |
| Short portfolio interaction | A practiced Forest Loop run takes approximately 60–90 seconds. This is a tuning target, not a time limit.                                   |
| Replay value                | Results offer immediate retry and a clear comparison with the player's course best.                                                         |
| Extensible courses          | A second course runs through the same engine using its own definition and assets, without course-specific branches in core movement.        |
| Fits the portfolio          | Static generation, both locales, site navigation, and light/dark page UI continue to work.                                                  |

No analytics service is required. Validate the initial release with recorded manual playtests
and local performance measurements.

## 4. Scope and release sequence

| Release                    | Included                                                                                                      | Exit condition                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Prototype                  | Placeholder runner, terrain, camera, movement, jumping, experimental sprint, checkpoint                       | Movement feels controllable and a short test route is completable. |
| V1: first playable release | Forest Loop, pixel art, course selector, timer, results, local records, pause/restart, EN/FR, Lab integration | All V1 acceptance criteria and release checks pass.                |
| V1.1: multiple courses     | At least two additional courses with distinct elevation, terrain layouts, and duration                        | Each is selectable, independently tracked, and playtested.         |
| Later                      | Touch input, optional sound, specialized terrain physics, longer courses, ghost replay                        | Separately scoped after feedback; none blocks V1.                  |

### Out of scope for V1

- Multiplayer, accounts, online leaderboards, backend services, or cloud saves.
- Procedural generation, a visual level editor, or user-created courses.
- Combat, enemies, inventory, gear statistics, or character upgrades.
- Real-world route imports, GPS accuracy, realistic exercise simulation, or real race branding.
- Mandatory collectibles, unlock progression, lives, or a game-over limit.
- Audio, gamepad support, and playable touch controls.

## 5. Player journey

1. Open the game from its Lab card. The page shows a single still course preview with a large
   Start game button, rather than an embedded HUD and persistent controls.
2. Start opens the fullscreen course picker. Choose Forest Loop, Alpine Ascent, or Downhill Rush.
   If native fullscreen is unavailable or declined,
   a viewport-filling modal provides the same game layout.
3. A focused “How to play” modal explains the keyboard controls before the timer starts.
4. Activate Hit the trail to dismiss the modal and begin the run.
5. Run and jump through the route. Use checkpoints to recover from missed jumps.
6. Reopen How to play from the game toolbar or pause screen; gameplay and timing pause.
7. Reach the finish to see results, then retry or exit to the preview.

The game preserves its aspect ratio within fullscreen, letterboxing where needed. Exit game
and browser fullscreen exit stop the attempt and return to the preview. Both dialogs use
native modal focus containment. Controls are localized in English and French.

Three courses are now playable, selected inside fullscreen before the controls modal. Each
card includes a scene preview, difficulty, duration estimate, distance, elevation gain/loss,
profile, and course-specific personal best. All courses are available without unlocking.

### Game states

`selecting → loading → ready → running ↔ paused → finished`

- A fall temporarily enters `respawning`, then returns to `running`.
- Loading failure presents Retry and Back to courses; it never leaves a blank game surface.
- Start game opens fullscreen and the controls modal. Hit the trail focuses the game surface
  and starts timing only after the modal closes; there is no countdown requirement.
- Pausing freezes physics and the run clock. Resume requires an explicit action.
- Losing window focus, hiding the tab, or moving keyboard focus outside the game pauses play
  and clears held keys. Returning does not silently resume.
- Restart resets the run, timer, stamina, checkpoints, and fall count; it retains saved records.
- Choosing another course discards the current attempt and returns to selection.
- Leaving the route destroys the running game instance and releases input listeners.

## 6. Controls and movement

| Action       | Proposed keyboard input                 | Behavior                                                            |
| ------------ | --------------------------------------- | ------------------------------------------------------------------- |
| Move         | Left/Right arrows or A/D                | Accelerate toward a capped running speed; release to decelerate.    |
| Jump         | Space                                   | Tap for a short jump; hold for a higher jump up to a fixed maximum. |
| Sprint       | Hold Shift while moving                 | Higher capped speed while stamina is available.                     |
| Pause/resume | Escape and visible buttons              | Freeze/resume the active attempt.                                   |
| Restart      | R while game is focused; visible button | Start a fresh attempt on the same course.                           |

- No automatic running. Direction changes must feel responsive rather than slippery.
- Support a brief grace period after leaving a ledge and a short jump-input buffer before
  landing. Initial tuning ranges: 80–120 ms each; tune by playtesting.
- Holding jump must not trigger repeated jumps when landing; require a new press.
- Normalize movement across refresh rates using a fixed simulation step and bounded catch-up.
- Slopes and ledge edges must not snag the character or cause unintended launches.
- Camera follows with forward visibility, stays within course bounds, and avoids abrupt jumps.
- Hazards must be visible early enough to react at the intended approach speed.
- Terrain supplies the challenge: logs, roots, rocks, ledges, and small stream gaps.

### Sprint and stamina (prototype validation required)

- Show a labeled stamina gauge. Sprint consumes stamina; easing off restores it.
- Uphill sprinting may consume more stamina than level running; tune only after basic movement.
- At zero stamina, return to normal running. Exhaustion never immobilizes the player.
- Every required jump must be possible without a full stamina reserve, preventing soft locks.
- Downhill terrain should feel fast but remain controllable; specialized sliding is deferred.
- If stamina distracts from the platforming, simplify or defer it and update the scope explicitly.

### Falls and checkpoints

- Crossing an authored fall boundary returns the runner to the latest checkpoint (or start).
- Respawn at a safe location with zero velocity and restored stamina.
- The run timer continues during the short respawn; do not add an extra penalty in V1.
- Checkpoints activate in route order and visibly acknowledge activation.
- Unlimited retries; falling never deletes a saved record.
- Place a checkpoint before a difficult section and at the summit; avoid replaying long easy
  sections after a mistake.

## 7. Courses and progression

### V1 course: Forest Loop

A handcrafted, approximately 60–90 second route for a practiced player:

1. **Forest introduction:** safe ground, gentle slopes, roots, and a low log to teach movement.
2. **Rocky climb:** short ledges and small stream crossings that require deliberate jumps.
3. **Summit:** a flag checkpoint, open mountain view, and brief visual celebration.
4. **Descent:** flowing terrain and longer optional jumps leading to a finish banner.

The summit is a waypoint, not the finish. Build one clear main route without branching in V1.
Difficulty should come from readable terrain rather than hidden traps or blind leaps.

### Planned course catalog (names and timings are provisional)

| Course        | Terrain                     | Elevation profile            | Practiced duration | Difficulty / purpose                | Release        |
| ------------- | --------------------------- | ---------------------------- | ------------------ | ----------------------------------- | -------------- |
| Forest Loop   | Dirt, roots, rocks, streams | Gentle climb and descent     | 60–90 sec          | Easy; learn controls                | V1             |
| Alpine Ascent | Rock and narrow ledges      | Sustained uphill             | 2–3 min            | Medium; jump precision and pacing   | V1.1 candidate |
| Downhill Rush | Rock and forest             | Predominantly downhill       | 1–2 min            | Medium; speed and reactions         | V1.1 candidate |
| Ridge Run     | Exposed paths and gaps      | Repeated climbs and descents | About 2 min        | Hard; momentum and landing accuracy | Later          |
| Long Trail    | Forest, alpine, valley      | Full mountain loop           | 4–5 min            | Hard; sustained consistency         | Later          |

V1.1 should default to Alpine Ascent and Downhill Rush to demonstrate contrasting profiles.
Terrain can initially vary through geometry, obstacle placement, and artwork; mud, snow, and
scree do not need unique physics for a course to be distinct.

### Course metadata and content contract

Each course definition must contain:

- Stable ID and version; localized title and description.
- Difficulty, estimated duration range, preview asset, and environment/theme ID.
- World bounds, start position, ordered route profile, checkpoints, and finish trigger.
- Terrain collision geometry and obstacle placements, separate from decorative scenery.
- Asset references and scenery layers.
- Distance and elevation gain/loss derived from the intended route using a shared world-unit
  scale, or validated against that route at authoring time.

Display distance/elevation as game-scale estimates, not real-world route measurements. Duration
is an estimate; actual completion time is earned by the player. Elevation gain sums positive
changes along the route; elevation loss sums negative changes. Do not count the runner's jumps
or retries toward course metadata. The elevation-profile position follows route progress.

A validation step must catch duplicate IDs, missing assets, invalid bounds, unsafe spawns,
unordered checkpoints, and missing finish triggers. Reachability still requires playtesting.

## 8. HUD, results, and persistence

During a run, show elapsed time, stamina if retained, and a compact course elevation profile
with current progress. Keep the play area dominant and instructions available outside it.

Results show course name, finish time, course distance/elevation gain, falls, saved best, and
whether the attempt set a new personal best. Offer Retry and Choose course as clear actions.

- Measure time from simulation/gameplay time, excluding explicit pauses and hidden-tab time.
- Store records by course ID + course version + shared gameplay-rules version.
- Save completion status and fastest time only after reaching the finish.
- Compare unrounded times; format consistently for display (for example, `01:12.34`).
- A slower run or abandoned attempt never replaces a best. A tie retains the existing best.
- Changing geometry or movement rules that affect comparable times increments the relevant
  version. Cosmetic changes do not reset records.
- Use versioned local storage; validate reads and handle missing, malformed, or unavailable
  storage gracefully. Gameplay works in memory if saving fails, with a small explanatory note.
- Records stay on this browser/device; no account or cross-device synchronization is implied.

## 9. Art and presentation

- Original pixel-art runner with a hydration vest and blue clothing that echoes the site accent.
- Choose a cap or ponytail during art exploration; preserve a readable small silhouette.
- Minimum character states: idle, run, jump, fall; sprint can initially reuse run frames faster.
- Pixel-art terrain tiles, pine trees, trail markers, summit flag, and finish banner.
- Layered mountain/forest backgrounds with restrained parallax and subtle landing/running dust.
- Solid terrain and decoration must be distinguishable without relying only on color.
- Crisp sprite rendering with smoothing disabled and consistent asset scale. Prefer integer
  scaling where space permits; preserve aspect ratio with letterboxing when necessary.
- Course selector, buttons, instructions, and results follow the existing design system and
  typography. Pixel styling is primarily inside the game scene.
- Light/dark mode applies to surrounding UI; gameplay must remain readable in both modes.
- Use original or appropriately licensed assets; record sources and attribution requirements.

## 10. Accessibility and device behavior

- All selection, start, pause, restart, and results controls are semantic keyboard-accessible
  HTML with visible focus; provide a textual game description and controls outside the canvas.
- Capture movement keys only while the game surface is focused and active. Prevent page scroll
  for captured Space/arrow inputs, while preserving normal page behavior elsewhere.
- Tab must leave the game; never trap focus. Pause when focus leaves during play.
- Announce major state changes and results without continuously announcing the timer.
- Reduced-motion preference disables decorative parallax, shake, and particles where possible;
  essential character movement remains necessary for gameplay.
- No flashing effects or essential audio cues. UI text follows site contrast requirements.
- Menus and previews fit narrow screens without horizontal overflow. On touch-only devices,
  V1 explains that a keyboard is required and still allows course browsing.
- The real-time platformer is visual; accessible menus do not imply a fully nonvisual playable
  mode. Describe this limitation honestly and track alternatives separately if requested.

## 11. Technical direction

Use the existing Nuxt 4 / Vue 3 / TypeScript static site. Proposed rendering approach: Canvas 2D
for the world, Vue/HTML for menus, HUD, and results. No game-engine dependency is required by
this PRD; revisit that choice only if prototype complexity justifies it.

Suggested boundaries (final filenames may change):

| Area                            | Responsibility                                                         |
| ------------------------------- | ---------------------------------------------------------------------- |
| `app/pages/lab/trail-run.vue`   | Localized page shell, SEO, game entry point                            |
| `app/pages/lab/index.vue`       | New localized experiment card                                          |
| `app/components/lab/trail-run/` | Selector, game host, HUD, results                                      |
| `app/utils/trail-run/`          | Types, physics, collisions, timing, course validation, storage helpers |
| `app/data/trail-run/`           | Typed course definitions and catalog                                   |
| `public/games/trail-run/`       | Sprites, tiles, backgrounds, previews, asset credits                   |
| `i18n/locales/{en,fr}.json`     | UI copy, course labels, instructions, SEO                              |

- Keep simulation independent of Vue rendering and course content. Avoid reactive updates for
  every entity each frame; update visible UI at an appropriate cadence.
- Initialize canvas, input, and storage only on the client. Prerender useful page content with
  a stable loading/fallback area and no hydration mismatch.
- Load the game runtime only on its route and course assets on demand. Other portfolio routes
  must not download game sprites or execute the game loop.
- Use a fixed-step loop with capped elapsed-time catch-up; avoid physics tunneling at sprint
  speed. Cancel animation frames and remove all listeners on unmount.
- Keep all assets self-hosted and compatible with the existing CSP and static deployment.
- Localize all user-facing copy in English and French and use locale-aware navigation.
- Reserve the game viewport's dimensions to avoid layout shifts while assets load.

### Performance targets to verify

- Target 60 fps on a representative desktop/laptop; record browser, hardware, viewport, and
  frame timing for a full course before declaring the target achieved.
- On the reference device, aim for a 95th-percentile frame duration of 20 ms or less during play.
- Initial game-specific JS and V1 assets should target at most 2 MB transferred with compression;
  measure and document any justified deviation before release.
- Repeated start/restart/course-change cycles must not accumulate game loops or listeners.
- No background simulation while paused, hidden, or on another route.

## 12. Acceptance criteria

| ID    | Release | Pass condition                                                                                                                                        |
| ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | V1      | A localized Lab card opens the game in EN and FR; direct navigation also works in static output.                                                      |
| AC-02 | V1      | The page shows a single still preview and Start button; launching opens fullscreen (or viewport fallback) and a controls modal before timing begins.  |
| AC-03 | V1      | Movement, variable jump, and restart work using the documented keys; no stuck movement after focus loss.                                              |
| AC-04 | V1      | Equivalent movement inputs produce equivalent simulated travel/jump behavior at 30, 60, and 120 Hz rendering.                                         |
| AC-05 | V1      | Forest Loop can be completed from start through summit to finish; no mandatory jump requires unavailable stamina.                                     |
| AC-06 | V1      | Falls safely respawn at the correct checkpoint, count toward falls, and preserve elapsed attempt time.                                                |
| AC-07 | V1      | Pause, focus loss, and tab hiding freeze time and physics; resume is explicit with cleared held input.                                                |
| AC-08 | V1      | Finish triggers once, stops time, and presents correct results with working Retry and Choose course actions.                                          |
| AC-09 | V1      | Faster completed runs persist across reloads; slower, tied, and abandoned runs do not overwrite bests.                                                |
| AC-10 | V1      | Invalid/unavailable storage and failed asset loading have usable fallbacks; no unhandled error or blank screen.                                       |
| AC-11 | V1      | Keyboard-only menus, focus behavior, reduced motion, narrow screens, and both themes pass manual review.                                              |
| AC-12 | V1      | EN/FR copy is complete and readable; no raw translation keys or clipped French labels.                                                                |
| AC-13 | V1      | Runtime and assets are isolated to the game; route exit and repeated restarts leave no active stale loops/listeners.                                  |
| AC-14 | V1      | Lint, typecheck, static generation, browser smoke checks, and documented performance/playtest targets pass or have explicitly recorded scope changes. |
| AC-15 | V1.1    | At least three playable courses appear in the selector, with distinct profiles and independently stored records.                                      |
| AC-16 | V1.1    | Additional courses use the same engine; profile/metadata match authored routes, and each course is completable.                                       |

## 13. Delivery tracker

Status vocabulary: Not started / In progress / Blocked / Done. Mark an item complete only when
its exit criteria have evidence. Add an implementation PR/commit or manual verification note to
the milestone table. Update this file in the same change that completes a milestone.

| Milestone                                | Status      | Depends on            | Evidence / notes                                                                                         |
| ---------------------------------------- | ----------- | --------------------- | -------------------------------------------------------------------------------------------------------- |
| M0 — PRD recorded                        | Done        | —                     | Initial PRD created 2026-09-17; proposed defaults remain subject to prototype feedback.                  |
| M1 — Movement prototype                  | In progress | M0                    | —                                                                                                        |
| M2 — Course architecture and Forest Loop | Done        | M1                    | Three typed routes share the engine; catalog, metadata, checkpoint and full-route simulation tests pass. |
| M3 — Complete run flow                   | In progress | M2                    | —                                                                                                        |
| M4 — Art and portfolio integration       | In progress | M3                    | —                                                                                                        |
| M5 — V1 release validation               | In progress | M4                    | —                                                                                                        |
| M6 — Multiple courses                    | In progress | M5 validation ongoing | Three courses implemented; automated traversal and Chrome switching verified. Human playtesting remains. |

### M1 — Movement prototype

- [x] Create client-only game host and simulation/rendering boundaries.
- [x] Implement horizontal movement, variable jumps, jump buffer, and ledge grace period.
- [x] Implement terrain collision, slopes, camera, and a small placeholder test route.
- [ ] Prototype sprint/stamina and decide whether to retain, simplify, or defer it.
- [ ] Validate movement feel and refresh-rate independence; record tuning values.

### M2 — Course architecture and Forest Loop

- [x] Define typed course schema, shared unit scale, versioning, and validation.
- [x] Implement course loading, start/finish triggers, ordered checkpoints, and respawn.
- [x] Author Forest Loop's four sections and validate reachable jumps.
- [x] Generate/validate route distance, gain/loss, profile, and position marker.
- [x] Verify the engine accepts a second minimal test definition without movement changes.

### M3 — Complete run flow

- [x] Build course selector, instructions, loading, ready, and failure states.
- [x] Implement timing, pause/resume, focus/tab handling, restart, and course exit.
- [x] Build HUD and results with personal-best comparison.
- [x] Implement validated, versioned local persistence and failure fallback.
- [ ] Verify all state transitions and repeated start/restart behavior.

### M4 — Art and portfolio integration

- [ ] Create runner animations, terrain assets, scenery, previews, and asset credits.
- [ ] Integrate art, restrained parallax, dust, and summit/finish feedback.
- [x] Add Lab card, localized page shell, SEO, and locale-aware navigation.
- [ ] Complete EN/FR copy, responsive menus, theme support, and keyboard-required mobile message.
- [ ] Complete focus, semantic controls, status announcements, and reduced-motion behavior.

### M5 — V1 release validation

- [x] Add focused simulation tests for timing, jumps/collisions, checkpoint behavior, and record replacement.
- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run generate`.
- [ ] Smoke-test static output in Chrome, Firefox, and Safari; record versions/devices.
- [ ] Verify each V1 acceptance criterion, including storage and asset failures.
- [ ] Conduct first-time player testing and tune course difficulty/duration.
- [ ] Measure asset transfer size, frame timing, and runtime cleanup.
- [ ] Record V1 outcome, remaining issues, and implementation references below.

A focused Node test suite now runs with `npm run test:trail` on Node 22. It covers course
validation, variable jumps, fixed-step consistency, respawn, full-route reachability, finish
timing, and invalid saved records. Browser integration and record-replacement coverage remain
to be expanded.

### M6 — Multiple courses (V1.1)

- [x] Author Alpine Ascent with a sustained-climb identity.
- [x] Author Downhill Rush with a descent-focused identity.
- [x] Add previews, translations, difficulty, duration estimates, and validated profiles.
- [x] Verify switching courses resets attempt state and keeps records separate.
- [ ] Playtest both routes and verify AC-15 / AC-16 plus applicable V1 regression checks.

## 14. Risks and open decisions

| Topic                             | Current approach                                                                                 | Resolve when    |
| --------------------------------- | ------------------------------------------------------------------------------------------------ | --------------- |
| Movement feels frustrating        | Prioritize placeholder movement before finished art; tune jump forgiveness and camera.           | M1              |
| Stamina adds too much complexity  | Prototype as optional; basic traversal must remain possible without sprint.                      | M1              |
| Slope collisions become expensive | Start with a restricted set of terrain shapes; retain a course-data boundary.                    | M1–M2           |
| Pixel art workload grows          | One biome family and a small animation set first; reuse compatible assets.                       | M4              |
| Course scope expands              | Ship Forest Loop before long routes or special terrain physics.                                  | Every milestone |
| Title and character appearance    | Working title, blue outfit, hydration vest; cap/ponytail and exact sprite resolution still open. | M4              |
| Mobile visitors cannot play V1    | Clear keyboard requirement and usable browsing; scope touch play after desktop validation.       | M4 / later      |
| Course metrics feel misleading    | Use consistent game-scale estimates and a practiced duration range.                              | M2              |
| Scores become incomparable        | Version course geometry and shared gameplay rules.                                               | M2–M3           |

## 15. Decision and progress log

| Date       | Type              | Entry                                                                                                                          |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 2026-09-17 | Agreed direction  | Trail-running theme, pixel art, side-view platforming, keyboard input, and future selectable courses.                          |
| 2026-09-17 | Planning baseline | Record one-course V1 and multi-course V1.1; gameplay specifics remain proposed until prototype validation.                     |
| 2026-09-18 | User feedback     | Replace embedded game with a still preview and large Start button; launch fullscreen and show controls in a modal before play. |
| 2026-09-17 | Documentation     | PRD and delivery tracker created. No gameplay implementation completed.                                                        |

### Verification log

Add dated entries with: milestone/AC IDs, build or commit, environment, result, and remaining
issues.

- 2026-09-17 — First implementation: separate TypeScript simulation, course data, Canvas renderer,
  and Vue UI. Forest Loop is the only playable course. Art is drawn using original pixel shapes
  directly in Canvas; no external artwork or game-engine dependency was added.
- Automated: `npm run test:trail` passes six tests, including a complete no-sprint, zero-fall
  Forest Loop run inside the 60–90 second target. This verifies reachability, not human difficulty.
- Automated: lint and typecheck passed (typecheck emits the repository's existing Vue plugin
  warning). Static generation produced both `/lab/trail-run` and `/fr/lab/trail-run`.
- Chrome local browser: verified start, Escape pause, resume, and Tab leaving/pausing the game;
  inspected pixel rendering and French course-selection copy. Full-course human playtesting,
  Safari/Firefox, storage-failure interaction, mobile review, and measured performance remain open.
- Prototype tuning: 155 world units/sec running, 225 sprinting, gravity 1000, initial jump velocity
  -345, jump-release velocity cap -140, 100 ms ledge grace, and 120 ms jump buffer.
- Scope notes: sprint currently has uniform energy use rather than slope-dependent drain.
  The course uses continuous slopes, logs, and gaps; discrete rock platforms, richer summit
  feedback, and final sprite polish remain to be evaluated. Course validation covers geometry
  order, finish bounds, and safe checkpoints; broader catalog validation is still pending.

### Future backlog

- [ ] Touch controls with responsive landscape gameplay.
- [ ] Ridge Run and Long Trail.
- [ ] Optional sound effects and ambient audio with mute controls.
- [ ] Mud, snow, or scree with distinct, readable movement behavior.
- [ ] Local ghost of a personal-best run.
- [ ] Optional alternate paths after the main route is proven.
- [ ] Gamepad input and customizable keyboard bindings.

## References

- [README](./README.md): site architecture, commands, and deployment.
- [Design system](./DESIGN_SYSTEM.md): surrounding UI styling.
- [Repository guidance](./CLAUDE.md): static rendering, localization, and code conventions.
- [Lab index](./app/pages/lab/index.vue): existing experiment listing.

### Fullscreen entry follow-up — 2026-09-18

- [x] Replace embedded HUD/selector with a still pixel-art preview and large Start game button.
- [x] Open native fullscreen from a user gesture, with a viewport-filling dialog fallback.
- [x] Show controls in a native modal before starting the timer; allow reopening during play.
- [x] Preserve canvas aspect ratio and add an explicit Exit game action.
- [x] Translate the new flow into English and French.
- [x] Verify Chrome native fullscreen (`:fullscreen`), initial controls, delayed timer start,
      reopening controls, return to preview, and browser Escape exit.

This feedback supersedes the original inline control strip and V1 course-detail selector.
The multiple-course roadmap remains unchanged.

### Multiple-course implementation — 2026-09-18

- Added Alpine Ascent (2,059 game-scale metres, +178 m, 120–180 seconds) and Downhill Rush
  (1,329 game-scale metres, -136 m, 75–120 seconds). Forest Loop remains unchanged.
- Fullscreen now opens a three-card course picker, followed by the existing controls modal.
  Cards have generated scene previews, normalized elevation profiles, metadata, and best times.
- Added theme-driven alpine rock and sunset forest palettes. Section labels come from course
  definitions rather than Forest Loop coordinates. The same simulation drives all courses.
- Added catalog validation for duplicate IDs, finite/ordered geometry, gaps, obstacles,
  checkpoints, sections, finish bounds, and versions. Game scale is explicitly 10 world units/m.
- Best times remain keyed by course and rules version; the pure record-update helper rejects
  abandoned, slower, tied, invalid, and non-positive attempts. Existing Forest Loop records
  keep their original key and gameplay-rules version.
- Fourteen Node tests pass, covering all three full routes without sprint/falls, each checkpoint,
  profile bounds, malformed definitions, independent records, timing, and variable jumps.
- Chrome: verified selecting Alpine, controls-to-run transition, switching to Downhill during
  a run, and reset timer/energy/progress. Fixed toolbar reflow on canvas blur that swallowed
  a course-switch click. Picker actions stay visible while cards scroll on shorter screens.
- This phase brings forward the planned V1.1 content while M5 validation remains open. It does
  not mark the broader release complete: human difficulty feedback, Firefox/Safari, and measured
  frame performance are still outstanding.
